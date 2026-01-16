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
  // Support block frontmatter or inline: --- key: value --- body...
  const fmBlockMatch = raw.match(/^---\s*[\r\n]+([\s\S]*?)\s*---\s*[\r\n]+([\s\S]*)$/);
  const fmInlineMatch = raw.match(/^---\s*(.*?)\s*---\s*([\s\S]*)$/);
  if (!fmBlockMatch && !fmInlineMatch) {
    return { meta: {}, body: raw };
  }

  const fm = (fmBlockMatch ? fmBlockMatch[1] : fmInlineMatch?.[1] || "").trim();
  const body = (fmBlockMatch ? fmBlockMatch[2] : fmInlineMatch?.[2] || "").trimStart();

  const meta: any = {};
  const lines = fm.includes("\n")
    ? fm.split(/\r?\n/)
    : fm.match(/([A-Za-z0-9_]+:\s*\"[^\"]*\"|[A-Za-z0-9_]+:\s*'[^']*'|[A-Za-z0-9_]+:\s*[^\s]+)/g) || [];
  lines.forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!m) return;
    const key = m[1];
    let val = m[2] || "";
    val = val.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1").trim();
    meta[key] = val;
  });

  return { meta, body };
}

function normalizeSlug(value: string): string {
  return value.trim().toLowerCase();
}

function deriveDateFromFilename(filename: string): string | undefined {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
  return match ? match[1] : undefined;
}

function cleanSlugForTitle(slug: string): string {
  const parts = slug.split("-");
  if (parts.length > 1 && /^[0-9a-f]{6,}$/i.test(parts[parts.length - 1])) {
    parts.pop();
  }
  return parts.join("-");
}

function toTitleCase(value: string): string {
  const acronyms = new Set(["ai", "cntt", "b2b", "b2c", "tp", "hcm", "vn"]);
  return value
    .split(/[-_\\s]+/)
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (acronyms.has(lower)) return lower.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
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

function extractHeadingTitle(body: string): string | undefined {
  const match = body.match(/^\s*#\s+(.+?)\s*$/m);
  return match ? match[1].trim() : undefined;
}

export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const text = String(raw).replace(/^\uFEFF/, "");
      const { meta, body } = parseFrontmatter(text);

      // fallback slug from filename if missing
      const file = path.split("/").pop() || "";
      const fileSlug = file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const fileDate = deriveDateFromFilename(file);

      const slug = (meta.slug || fileSlug).trim();
      const normalizedTitleSource = cleanSlugForTitle(slug || fileSlug);
      const derivedTitle = toTitleCase(normalizedTitleSource);
      const excerpt = makeExcerpt(body, 200);
      const rawTitle = String(meta.title || "").trim();
      const headingTitle = extractHeadingTitle(body);
      const title = rawTitle || headingTitle || derivedTitle;

      return {
        title,
        slug,
        date: meta.date || fileDate,
        category: meta.category || "Tin tức",
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
