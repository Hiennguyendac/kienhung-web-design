// src/lib/posts.ts
// Read markdown files as raw text in Vite
const modules = import.meta.glob("/content/blog/*.md", { eager: true, as: "raw" });

export type Post = {
  title: string;
  slug: string;
  date?: string;
  category?: string;
  description?: string;
  image?: string;
  excerpt: string;
  body: string; // markdown body (no frontmatter)
  raw: string;  // full raw content
};

function parseFrontmatter(raw: string): { meta: any; body: string } {
  // Expect:
  // ---
  // key: value
  // ---
  // body...
  const fmMatch = raw.match(/^---\s*[\r\n]+([\s\S]*?)\s*---\s*[\r\n]+([\s\S]*)$/);
  if (!fmMatch) {
    return { meta: {}, body: raw };
  }

  const fm = fmMatch[1];
  const body = fmMatch[2];

  const meta: any = {};
  fm.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!m) return;
    const key = m[1];
    let val = m[2] || "";
    // strip quotes
    val = val.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1").trim();
    meta[key] = val;
  });

  return { meta, body };
}

function normalizeSlug(value: string): string {
  return value.trim().toLowerCase();
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~]+/g, "")
    .replace(/^\s*[-+*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\r?\n|\r/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function makeExcerpt(body: string, maxLen = 200): string {
  const clean = stripMarkdown(body);
  if (clean.length <= maxLen) return clean;

  const slice = clean.slice(0, maxLen + 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cutoff = lastSpace > 120 ? lastSpace : maxLen;
  return `${clean.slice(0, cutoff).trim()}...`;
}

export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const text = String(raw);
      const { meta, body } = parseFrontmatter(text);

      // fallback slug from filename if missing
      const file = path.split("/").pop() || "";
      const fileSlug = file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");

      const slug = (meta.slug || fileSlug).trim();
      const excerpt = makeExcerpt(body, 200);

      return {
        title: meta.title || fileSlug,
        slug,
        date: meta.date,
        category: meta.category,
        description: meta.description || "",
        image: meta.image || "",
        excerpt,
        body,
        raw: text,
      } as Post;
    })
    .filter((p) => p.slug && p.title);
}

export function getPostBySlug(slug: string): Post | undefined {
  const target = normalizeSlug(decodeURIComponent(slug));
  return getAllPosts().find((p) => normalizeSlug(p.slug) === target);
}
