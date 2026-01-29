import { supabase } from "@/integrations/supabase/client";

type ViewsMap = Record<string, number>;

const VIEW_KEY_PREFIX = "kh_post_viewed";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hasCountedToday(slug: string) {
  try {
    return localStorage.getItem(`${VIEW_KEY_PREFIX}:${slug}:${todayKey()}`) === "1";
  } catch {
    return false;
  }
}

function markCountedToday(slug: string) {
  try {
    localStorage.setItem(`${VIEW_KEY_PREFIX}:${slug}:${todayKey()}`, "1");
  } catch {
    // ignore storage errors
  }
}

export async function fetchPostViews(slugs: string[]) {
  if (!slugs.length) return {};
  const { data, error } = await supabase.from("post_views").select("slug,views").in("slug", slugs);
  if (error || !data) return {};
  return data.reduce<ViewsMap>((acc, row) => {
    acc[row.slug] = Number(row.views || 0);
    return acc;
  }, {});
}

export async function incrementPostView(slug: string) {
  if (!slug || hasCountedToday(slug)) return null;
  const { data, error } = await supabase.rpc("increment_post_view", { p_slug: slug });
  if (!error) markCountedToday(slug);
  return error ? null : Number(data);
}

export function subscribePostViews(
  slugs: string[],
  onChange: (slug: string, views: number) => void,
) {
  if (!slugs.length) return null;

  const channel = supabase
    .channel(`post_views:${slugs.join(",")}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "post_views" },
      (payload) => {
        const row = payload.new as { slug?: string; views?: number } | null;
        if (!row?.slug || !slugs.includes(row.slug)) return;
        onChange(row.slug, Number(row.views || 0));
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
