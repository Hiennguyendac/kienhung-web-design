import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

// Supabase CLI blocks secrets prefixed with SUPABASE_, so use custom names.
const SUPABASE_URL = Deno.env.get("SB_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SB_SERVICE_ROLE_KEY") || "";

const SMTP_HOST = Deno.env.get("SMTP_HOST") || "";
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT") || "465");
const SMTP_USER = Deno.env.get("SMTP_USER") || "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") || "";
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") || SMTP_USER;
const EMAIL_TO = Deno.env.get("EMAIL_TO") || "contact@kienhunginvest.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

type ContactType = "contact" | "newsletter" | "quote" | "schedule";

type ContactRequest = {
  type: ContactType;
  payload: Record<string, unknown>;
  pageUrl?: string;
};

function mustEnv() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SB_URL or SB_SERVICE_ROLE_KEY");
  }
}

function esc(input: unknown) {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function plainLine(label: string, value: unknown) {
  const v = String(value ?? "").trim();
  return v ? `${label}: ${v}` : null;
}

function buildEmail(type: ContactType, payload: Record<string, unknown>, pageUrl?: string) {
  const subjectMap: Record<ContactType, string> = {
    contact: "Liên hệ mới từ website",
    newsletter: "Đăng ký nhận bản tin",
    quote: "Yêu cầu tư vấn / báo giá",
    schedule: "Đặt lịch tư vấn",
  };

  const lines: string[] = [];

  if (type === "contact") {
    lines.push(plainLine("Họ tên", payload.name));
    lines.push(plainLine("Điện thoại", payload.phone));
    lines.push(plainLine("Email", payload.email));
    lines.push(plainLine("Công ty", payload.company));
    lines.push(plainLine("Nội dung", payload.message));
  }

  if (type === "newsletter") {
    lines.push(plainLine("Email đăng ký", payload.email));
  }

  if (type === "quote") {
    lines.push(plainLine("Mục tiêu", payload.goal));
    lines.push(plainLine("Ngân sách", payload.budget));
    lines.push(plainLine("Thời gian", payload.timeline));
    lines.push(plainLine("Đối tác", payload.partner));
    lines.push(plainLine("Ghi chú", payload.note));
    lines.push(plainLine("Họ tên", payload.name));
    lines.push(plainLine("Điện thoại", payload.phone));
    lines.push(plainLine("Email", payload.email));
    lines.push(plainLine("Công ty", payload.company));
    lines.push(plainLine("Dịch vụ", payload.service));
    lines.push(plainLine("Nhu cầu chi tiết", payload.detail));
  }

  if (type === "schedule") {
    lines.push(plainLine("Họ tên", payload.name));
    lines.push(plainLine("Điện thoại", payload.phone));
    lines.push(plainLine("Email", payload.email));
    lines.push(plainLine("Dịch vụ", payload.service));
    lines.push(plainLine("Ngày hẹn", payload.date));
    lines.push(plainLine("Khung giờ", payload.slot));
  }

  if (pageUrl) {
    lines.push(plainLine("Trang gửi", pageUrl));
  }

  const filtered = lines.filter(Boolean) as string[];
  const text = filtered.join("\n");
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6">${filtered
    .map((line) => `<p style="margin:0 0 8px">${esc(line)}</p>`)
    .join("")}</div>`;

  return { subject: subjectMap[type], text, html };
}

async function sendEmail(subject: string, text: string, html: string) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Missing SMTP credentials");
  }

  const client = new SmtpClient();
  const options = {
    hostname: SMTP_HOST,
    port: SMTP_PORT,
    username: SMTP_USER,
    password: SMTP_PASS,
  };

  if (SMTP_PORT === 465) {
    await client.connectTLS(options);
  } else {
    await client.connect(options);
  }

  await client.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject,
    content: text,
    html,
  });

  await client.close();
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    mustEnv();
    const body = (await req.json()) as ContactRequest;
    const type = body?.type as ContactType;

    if (!type || !["contact", "newsletter", "quote", "schedule"].includes(type)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = body.payload || {};
    const pageUrl = body.pageUrl || "";
    const userAgent = req.headers.get("user-agent") || "";
    const ipAddress = req.headers.get("x-forwarded-for") || "";

    const insertBase = {
      page_url: pageUrl,
      user_agent: userAgent,
      ip_address: ipAddress,
    };

    let insertResult: { data: { id: string } | null; error: { message: string } | null } = {
      data: null,
      error: null,
    };

    if (type === "contact") {
      insertResult = await supabase
        .from("contact_messages")
        .insert({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          company: payload.company,
          message: payload.message,
          ...insertBase,
        })
        .select("id")
        .single();
    }

    if (type === "newsletter") {
      insertResult = await supabase
        .from("newsletter_signups")
        .insert({
          email: payload.email,
          ...insertBase,
        })
        .select("id")
        .single();
    }

    if (type === "quote") {
      insertResult = await supabase
        .from("quote_requests")
        .insert({
          goal: payload.goal,
          budget: payload.budget,
          timeline: payload.timeline,
          partner: payload.partner,
          note: payload.note,
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          company: payload.company,
          service: payload.service,
          detail: payload.detail,
          ...insertBase,
        })
        .select("id")
        .single();
    }

    if (type === "schedule") {
      insertResult = await supabase
        .from("schedule_requests")
        .insert({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          service: payload.service,
          date: payload.date,
          slot: payload.slot,
          ...insertBase,
        })
        .select("id")
        .single();
    }

    if (insertResult.error) {
      throw new Error(insertResult.error.message);
    }

    const { subject, text, html } = buildEmail(type, payload, pageUrl);
    let emailSent = false;
    try {
      await sendEmail(subject, text, html);
      emailSent = true;
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    return new Response(
      JSON.stringify({ ok: true, emailSent, id: insertResult.data?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("contact-intake error:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
