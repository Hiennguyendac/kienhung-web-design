import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_MODEL = Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!auth) {
    return new Response("Missing Authorization", {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
  const anonKey = auth.replace("Bearer", "").trim();

  if (!OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid payload", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        metadata: {
          anonKeyPrefix: anonKey.slice(0, 12),
        },
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return new Response(
        JSON.stringify({ error: data.error || "Upstream error" }),
        {
          status: upstream.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({ content: data.choices?.[0]?.message?.content || "", raw: data }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    console.error("openai-chat error", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
