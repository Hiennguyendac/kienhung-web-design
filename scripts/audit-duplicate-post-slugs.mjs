import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(repoDir, "content", "blog");
const sitemapPath = path.join(repoDir, "public", "sitemap.xml");
const duplicateRedirectMapPath = path.join(repoDir, "scripts", "duplicate-redirect-map.json");

function parseFrontmatter(raw) {
  const blockMatch = raw.match(/^\s*---\s*[\r\n]+([\s\S]*?)\s*---\s*[\r\n]+([\s\S]*)$/);
  const inlineMatch = raw.match(/^\s*---\s*(.*?)\s*---\s*([\s\S]*)$/);
  if (!blockMatch && !inlineMatch) return { meta: {}, body: raw };

  const frontmatter = (blockMatch?.[1] || inlineMatch?.[1] || "").trim();
  const body = (blockMatch?.[2] || inlineMatch?.[2] || "").trimStart();
  const meta = {};
  const lines = frontmatter.includes("\n")
    ? frontmatter.split(/\r?\n/)
    : frontmatter.match(/([A-Za-z0-9_]+:\s*"[^"]*"|[A-Za-z0-9_]+:\s*'[^']*'|[A-Za-z0-9_]+:\s*[^\s]+)/g) || [];

  for (const line of lines) {
    const match = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!match) continue;
    const value = match[2].replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1").trim();
    meta[match[1]] = value;
  }

  return { meta, body };
}

function slugifyVietnamese(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function deriveDate(filename, meta) {
  if (meta.date) return meta.date;
  return filename.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1] || "không có";
}

function deriveTitle(meta, body, slug) {
  if (meta.title) return meta.title;
  return body.match(/^\s*#\s+(.+?)\s*$/m)?.[1]?.trim() || slug;
}

function sourceInfo(meta, filename) {
  const sourceFields = ["source", "source_name", "source_url", "source_date", "origin", "created_by", "generator"];
  const presentFields = sourceFields.filter((field) => meta[field]);
  const hasHashFilename = /-[0-9a-f]{6,}$/i.test(filename.replace(/\.md$/, ""));

  if (meta.source_name || meta.source_url || meta.source_date || meta.source === "n8n") {
    return {
      label: "n8n tự động",
      evidence: `metadata: ${presentFields.join(", ")}`,
    };
  }

  if (hasHashFilename) {
    return {
      label: "n8n tự động (suy ra)",
      evidence: "tên file có hậu tố hash tự sinh",
    };
  }

  return {
    label: "thủ công/không xác định",
    evidence: presentFields.length ? `metadata: ${presentFields.join(", ")}` : "không có trường nguồn tường minh",
  };
}

function groupBy(items, keyFn) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFn(item);
    const group = groups.get(key) || [];
    group.push(item);
    groups.set(key, group);
  }
  return groups;
}

function printSitemapSection(label, urls) {
  const duplicateGroups = [...groupBy(urls, (url) => url).entries()]
    .filter(([, group]) => group.length > 1)
    .sort(([left], [right]) => left.localeCompare(right));

  console.log(`\n=== ${label} ===`);
  console.log(`Tổng URL: ${urls.length}`);
  console.log(`Nhóm URL trùng: ${duplicateGroups.length}`);
  if (!duplicateGroups.length) {
    console.log("Không có URL trùng.");
    return duplicateGroups;
  }

  for (const [url, group] of duplicateGroups) {
    console.log(`- ${url} (${group.length} lần)`);
  }
  return duplicateGroups;
}

async function loadPosts() {
  const filenames = (await fs.readdir(contentDir)).filter((file) => file.endsWith(".md")).sort();
  const posts = [];

  for (const filename of filenames) {
    const filePath = path.join(contentDir, filename);
    const raw = (await fs.readFile(filePath, "utf8")).replace(/^\uFEFF/, "");
    const { meta, body } = parseFrontmatter(raw);
    const fileSlug = filename.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
    const rawSlug = String(meta.slug || fileSlug).trim();
    const slug = slugifyVietnamese(rawSlug);

    if (!slug) continue;
    posts.push({
      filename,
      fullSlug: fileSlug,
      title: deriveTitle(meta, body, slug),
      date: deriveDate(filename, meta),
      rawSlug,
      slug,
      source: sourceInfo(meta, filename),
      changedByNormalization: rawSlug !== slug,
    });
  }

  return posts;
}

async function loadRedirectedFullSlugs() {
  try {
    const raw = await fs.readFile(duplicateRedirectMapPath, "utf8");
    const map = JSON.parse(raw);
    return new Set(
      map.duplicateGroups
        .flatMap((group) => group.posts)
        .filter((post) => !post.isCanonical)
        .map((post) => post.fullSlug),
    );
  } catch {
    return new Set();
  }
}

async function loadCheckedInSitemapUrls() {
  try {
    const xml = await fs.readFile(sitemapPath, "utf8");
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  } catch {
    return [];
  }
}

async function main() {
  const posts = await loadPosts();
  const duplicateGroups = [...groupBy(posts, (post) => post.slug).entries()]
    .filter(([, group]) => group.length > 1)
    .sort(([left], [right]) => left.localeCompare(right));

  console.log("=== KIỂM TRA SLUG BÀI VIẾT ===");
  console.log(`Nguồn: ${path.relative(repoDir, contentDir)}/*.md`);
  console.log(`Tổng file Markdown: ${posts.length}`);
  console.log(`Nhóm slug trùng: ${duplicateGroups.length}`);
  console.log(`Tổng bài nằm trong nhóm trùng: ${duplicateGroups.reduce((sum, [, group]) => sum + group.length, 0)}`);

  if (!duplicateGroups.length) {
    console.log("Không phát hiện slug trùng.");
  }

  for (const [slug, group] of duplicateGroups) {
    const normalizedCollision = group.some((post) => post.changedByNormalization);
    console.log(`\n[${slug}] - ${group.length} bài`);
    console.log(`Nguyên nhân chuẩn hóa dấu/ký tự: ${normalizedCollision ? "có" : "chưa xác định"}`);

    for (const post of group) {
      console.log(`- file: content/blog/${post.filename}`);
      console.log(`  tiêu đề: ${post.title}`);
      console.log(`  ngày tạo: ${post.date}`);
      console.log(`  slug gốc: ${post.rawSlug}`);
      console.log(`  nguồn dữ liệu: ${post.source.label}`);
      console.log(`  căn cứ nguồn: ${post.source.evidence}`);
      console.log(`  slug sau chuẩn hóa: ${post.slug}`);
    }
  }

  const redirectedFullSlugs = await loadRedirectedFullSlugs();
  const generatedPostUrls = posts
    .filter((post) => !redirectedFullSlugs.has(post.fullSlug))
    .map((post) => `https://kienhunginvest.com/tin-tuc/${encodeURIComponent(post.slug)}`);
  const generatedDuplicateGroups = printSitemapSection(
    "URL BÀI VIẾT SAU KHI generate-sitemap.mjs ÁP DỤNG MAP",
    generatedPostUrls,
  );
  console.log(
    generatedDuplicateGroups.length
      ? "Kết luận sitemap: VẪN còn URL bài viết trùng sau khi áp dụng map."
      : "Kết luận sitemap: không còn URL bài viết trùng sau khi áp dụng map.",
  );

  const checkedInUrls = await loadCheckedInSitemapUrls();
  printSitemapSection("URL ĐANG CÓ TRONG public/sitemap.xml", checkedInUrls);

  console.log("\n=== ĐỀ XUẤT (CHƯA IMPLEMENT) ===");
  console.log("Khi publish: chuẩn hóa slug trước, kiểm tra slug đã tồn tại; nếu trùng thì từ chối publish hoặc thêm hậu tố ổn định như -2, -3 (hoặc ngày/ID), đồng thời lưu redirect từ slug cũ nếu đã public.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
