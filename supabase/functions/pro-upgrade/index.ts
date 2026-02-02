import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const SUPABASE_URL = (
  Deno.env.get("SB_URL") || Deno.env.get("SUPABASE_URL") || ""
).trim();
const SUPABASE_SERVICE_ROLE_KEY = (
  Deno.env.get("SB_SERVICE_ROLE_KEY") ||
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
  ""
).trim();
const FUNCTIONS_BASE_URL = (Deno.env.get("FUNCTIONS_BASE_URL") || "").trim();

const SMTP_HOST = Deno.env.get("SMTP_HOST") || "";
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT") || "465");
const SMTP_USER = Deno.env.get("SMTP_USER") || "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") || "";
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") || SMTP_USER;
const EMAIL_TO = Deno.env.get("EMAIL_TO") || "contact@kienhunginvest.com";

const AMOUNT_VND = 100000;
const PRO_LIMIT = 200000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

let supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }
  return supabase;
}

function mustEnv() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SB_URL/SUPABASE_URL or SB_SERVICE_ROLE_KEY/SUPABASE_SERVICE_ROLE_KEY");
  }
  if (!SUPABASE_URL.startsWith("http")) {
    throw new Error("SUPABASE_URL is invalid (must start with http/https)");
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

function decodeJwt(token: string): { sub?: string; email?: string } {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return {};
  }
}

async function resolveUserId(token: string) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.getUser(token);
  if (error || !data?.user) {
    const fallback = decodeJwt(token);
    if (!fallback.sub) return null;
    return { id: fallback.sub, email: fallback.email ?? null };
  }
  return {
    id: data.user.id,
    email: data.user.email ?? null,
  };
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

function buildApproveUrl(token: string) {
  const base = FUNCTIONS_BASE_URL || `${SUPABASE_URL}/functions/v1`;
  return `${base}/pro-upgrade/approve?token=${encodeURIComponent(token)}`;
}

function buildEmail(payload: Record<string, unknown>, approveUrl: string) {
  const lines: string[] = [];
  lines.push(plainLine("Yêu cầu nâng cấp Pro", "100.000 VNĐ/tháng"));
  lines.push(plainLine("Họ tên", payload.full_name));
  lines.push(plainLine("Email", payload.email));
  lines.push(plainLine("Điện thoại", payload.phone));
  lines.push(plainLine("Ghi chú", payload.note));
  lines.push(plainLine("Trạng thái", payload.status));
  lines.push(plainLine("User ID", payload.user_id));
  lines.push(plainLine("Thời gian", payload.created_at));
  lines.push(plainLine("Link duyệt", approveUrl));

  const filtered = lines.filter(Boolean) as string[];
  const text = filtered.join("\n");
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6">
    ${filtered.map((line) => `<p style="margin:0 0 8px">${esc(line)}</p>`).join("")}
    <p style="margin-top:12px"><a href="${esc(approveUrl)}" style="color:#d4a829">Duyệt nâng cấp Pro</a></p>
  </div>`;

  return { subject: "Yêu cầu nâng cấp Pro", text, html };
}

async function approveRequest(token: string) {
  const sb = getSupabase();
  const { data: request, error } = await sb
    .from("pro_upgrade_requests")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !request) {
    return { ok: false, message: "Yêu cầu không tồn tại hoặc token không hợp lệ." };
  }

  if (request.status === "approved") {
    return { ok: true, message: "Yêu cầu đã được duyệt trước đó." };
  }

  const { error: updateError } = await sb
    .from("pro_upgrade_requests")
    .update({ status: "approved", approved_at: new Date().toISOString(), approved_by: "admin" })
    .eq("id", request.id);

  if (updateError) {
    return { ok: false, message: "Không thể cập nhật trạng thái duyệt." };
  }

  await sb.auth.admin.updateUserById(request.user_id, {
    user_metadata: { plan: "pro" },
  });

  const period = new Date().toISOString().slice(0, 7);
  const { data: usage } = await sb
    .from("ai_usage")
    .select("id")
    .eq("user_id", request.user_id)
    .eq("period", period)
    .maybeSingle();

  if (usage?.id) {
    await sb
      .from("ai_usage")
      .update({ tokens_limit: PRO_LIMIT, plan: "pro" })
      .eq("id", usage.id);
  } else {
    await sb.from("ai_usage").insert({
      user_id: request.user_id,
      period,
      tokens_limit: PRO_LIMIT,
      plan: "pro",
      tokens_used: 0,
    });
  }

  return { ok: true, message: "Đã duyệt và nâng cấp Pro cho người dùng." };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    mustEnv();

    if (req.method === "GET") {
      const url = new URL(req.url);
      if (url.pathname.endsWith("/approve")) {
        const token = url.searchParams.get("token") || "";
        if (!token) {
          return new Response("Thiếu token.", { status: 400 });
        }
        const result = await approveRequest(token);
        const html = `<!doctype html><html><head><meta charset="utf-8"><title>Pro Upgrade</title></head>
          <body style="font-family:Arial,sans-serif;padding:24px;background:#0b1220;color:#fff">
          <h2>${esc(result.ok ? "Thành công" : "Thất bại")}</h2>
          <p>${esc(result.message)}</p>
          </body></html>`;
        return new Response(html, { headers: { "Content-Type": "text/html" } });
      }
      return new Response("Not found", { status: 404 });
    }

    if (req.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/bearer\s+/i, "").trim();
    const user = token ? await resolveUserId(token) : null;

    if (!user?.id) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Unauthenticated",
          detail: "Missing or invalid access token",
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body = (await req.json()) as {
      fullName?: string;
      phone?: string;
      note?: string;
      amount?: number;
    };

    if (Number(body?.amount || AMOUNT_VND) !== AMOUNT_VND) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sb = getSupabase();

    const { data: existing } = await sb
      .from("pro_upgrade_requests")
      .select("id,status")
      .eq("user_id", user.id)
      .eq("status", "pending")
      .maybeSingle();

    if (existing?.id) {
      return new Response(JSON.stringify({ ok: true, status: "pending" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const random = crypto.getRandomValues(new Uint8Array(16));
    const tokenHex = Array.from(random).map((b) => b.toString(16).padStart(2, "0")).join("");
    const createdAt = new Date().toISOString();

    const insertPayload = {
      user_id: user.id,
      email: user.email,
      full_name: body?.fullName || null,
      phone: body?.phone || null,
      note: body?.note || null,
      amount: AMOUNT_VND,
      status: "pending",
      token: tokenHex,
      created_at: createdAt,
      updated_at: createdAt,
    };

    const { data: inserted, error } = await sb
      .from("pro_upgrade_requests")
      .insert(insertPayload)
      .select("*")
      .single();

    if (error || !inserted) {
      return new Response(JSON.stringify({ ok: false, error: error?.message || "Insert failed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const approveUrl = buildApproveUrl(tokenHex);
    const email = buildEmail(inserted as Record<string, unknown>, approveUrl);
    await sendEmail(email.subject, email.text, email.html);

    return new Response(JSON.stringify({ ok: true, status: "pending" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
