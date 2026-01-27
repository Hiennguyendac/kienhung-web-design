import fs from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://kienhunginvest.com";
const rootDir = process.cwd();
const contentDir = path.join(rootDir, "content", "blog");
const publicDir = path.join(rootDir, "public");
const outputPath = path.join(publicDir, "sitemap.xml");
const appRoutesPath = path.join(rootDir, "src", "App.tsx");
const fallbackStaticRoutes = [
  "/",
  "/gioi-thieu",
  "/linh-vuc-hoat-dong",
  "/tin-tuc",
  "/lien-he",
  "/yeu-cau-bao-gia",
];

function parseFrontmatter(raw) {
  const fmBlockMatch = raw.match(/^---\s*[\r\n]+([\s\S]*?)\s*---\s*[\r\n]+([\s\S]*)$/);
  const fmInlineMatch = raw.match(/^---\s*(.*?)\s*---\s*([\s\S]*)$/);
  if (!fmBlockMatch && !fmInlineMatch) {
    return { meta: {}, body: raw };
  }

  const fm = (fmBlockMatch ? fmBlockMatch[1] : fmInlineMatch?.[1] || "").trim();
  const meta = {};
  const lines = fm.includes("\n")
    ? fm.split(/\r?\n/)
    : fm.match(/([A-Za-z0-9_]+:\s*\"[^\"]*\"|[A-Za-z0-9_]+:\s*'[^']*'|[A-Za-z0-9_]+:\s*[^\s]+)/g) || [];

  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2] || "";
    val = val.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1").trim();
    meta[key] = val;
  }

  return { meta };
}

function deriveDateFromFilename(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
  return match ? match[1] : undefined;
}

async function loadPostRoutes() {
  let files = [];
  try {
    files = await fs.readdir(contentDir);
  } catch {
    return [];
  }

  const posts = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const filePath = path.join(contentDir, file);
    const raw = String(await fs.readFile(filePath, "utf8"));
    const { meta } = parseFrontmatter(raw.replace(/^\uFEFF/, ""));
    const fileSlug = file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
    const slug = (meta.slug || fileSlug).trim();
    const lastmod = meta.date || deriveDateFromFilename(file) || undefined;
    if (!slug) continue;
    posts.push({ loc: `/tin-tuc/${encodeURIComponent(slug)}`, lastmod });
  }

  return posts;
}

async function loadStaticRoutesFromApp() {
  try {
    const source = await fs.readFile(appRoutesPath, "utf8");
    const matches = Array.from(source.matchAll(/<Route\s+path="([^"]+)"/g));
    const routes = matches
      .map((match) => match[1])
      .filter((route) => route && !route.includes(":") && route !== "*")
      .filter((route) => route.startsWith("/"));
    return Array.from(new Set(routes)).sort();
  } catch {
    return fallbackStaticRoutes;
  }
}

function renderUrl({ loc, lastmod }) {
  const url = new URL(loc, siteUrl).toString();
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return `  <url>\n    <loc>${url}</loc>${lastmodTag}\n  </url>`;
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });
  const staticRoutes = await loadStaticRoutesFromApp();
  const postRoutes = await loadPostRoutes();
  const excluded = new Set(["/ai-tools"]);
  const allRoutes = [
    ...staticRoutes.filter((loc) => !excluded.has(loc)).map((loc) => ({ loc })),
    ...postRoutes,
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allRoutes.map(renderUrl),
    "</urlset>",
    "",
  ].join("\n");

  await fs.writeFile(outputPath, xml, "utf8");
  console.log(`Sitemap generated: ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
