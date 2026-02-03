import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const SUPABASE_URL = (Deno.env.get("SB_URL") || Deno.env.get("SUPABASE_URL") || "").trim();
const SUPABASE_SERVICE_ROLE_KEY = (
  Deno.env.get("SB_SERVICE_ROLE_KEY") ||
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
  ""
).trim();

const FREE_LIMIT = 20000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

async function resolveUserId(token: string) {
  const sb = getSupabase();
  const { data, error } = await sb.auth.getUser(token);
  if (error || !data?.user) return null;
  return { id: data.user.id, email: data.user.email ?? null };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase service role config");
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/bearer\s+/i, "").trim();
    if (!token) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const user = await resolveUserId(token);
    if (!user?.id) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json().catch(() => ({}))) as { period?: string };
    const period = body?.period || new Date().toISOString().slice(0, 7);

    const sb = getSupabase();
    const { data: usage } = await sb
      .from("ai_usage")
      .select("*")
      .eq("user_id", user.id)
      .eq("period", period)
      .maybeSingle();

    if (!usage) {
      return new Response(JSON.stringify({ ok: true, status: "no-usage" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (usage.plan === "pro" && usage.tokens_used >= usage.tokens_limit) {
      const { data: updated, error: updateError } = await sb
        .from("ai_usage")
        .update({ plan: "free", tokens_limit: FREE_LIMIT })
        .eq("id", usage.id)
        .select("*")
        .single();

      if (updateError || !updated) {
        return new Response(JSON.stringify({ ok: false, error: updateError?.message || "Update failed" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await sb.auth.admin.updateUserById(user.id, {
        user_metadata: { plan: "free" },
      });

      return new Response(JSON.stringify({ ok: true, status: "downgraded", usage: updated }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, status: "unchanged", usage }), {
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
