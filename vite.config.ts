import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "node:fs";
import path from "path";
import { componentTagger } from "lovable-tagger";

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "content", "blog");
const staticPrerenderRoutes = [
  "/",
  "/gioi-thieu",
  "/linh-vuc-hoat-dong",
  "/case-studies",
  "/tin-tuc",
  "/lien-he",
  "/hoi-dap",
];

function parseFrontmatter(raw: string): { meta: Record<string, string> } {
  const fmBlockMatch = raw.match(/^\s*---\s*[\r\n]+([\s\S]*?)\s*---\s*[\r\n]+([\s\S]*)$/);
  const fmInlineMatch = raw.match(/^\s*---\s*(.*?)\s*---\s*([\s\S]*)$/);
  if (!fmBlockMatch && !fmInlineMatch) {
    return { meta: {} };
  }

  const fm = (fmBlockMatch ? fmBlockMatch[1] : fmInlineMatch?.[1] || "").trim();
  const meta: Record<string, string> = {};
  const lines = fm.includes("\n")
    ? fm.split(/\r?\n/)
    : fm.match(/([A-Za-z0-9_]+:\s*\"[^\"]*\"|[A-Za-z0-9_]+:\s*'[^']*'|[A-Za-z0-9_]+:\s*[^\s]+)/g) || [];

  for (const line of lines) {
    const match = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1];
    const value = (match[2] || "").replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1").trim();
    meta[key] = value;
  }

  return { meta };
}

function slugifyVietnamese(value: string): string {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function getBlogPrerenderRoutes(): string[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf8").replace(/^\uFEFF/, "");
      const { meta } = parseFrontmatter(raw);
      const fileSlug = file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const slug = slugifyVietnamese(meta.slug || fileSlug);
      return slug ? `/tin-tuc/${slug}` : "";
    })
    .filter(Boolean);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    dirStyle: "nested",
    includedRoutes: () => [...staticPrerenderRoutes, ...getBlogPrerenderRoutes()],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) {
            return "vendor-react";
          }

          if (id.includes("framer-motion")) {
            return "vendor-motion";
          }

          if (id.includes("recharts") || id.includes("d3-") || id.includes("victory-vendor")) {
            return "vendor-charts";
          }

          if (id.includes("@supabase")) {
            return "vendor-supabase";
          }

          if (id.includes("@radix-ui")) {
            return "vendor-radix";
          }

          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }
        },
      },
    },
  },
}));
