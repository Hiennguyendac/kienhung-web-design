import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const images = [
  "src/assets/kien-hung-logo.jpg",
  "src/assets/hero-building.jpg",
  "src/assets/kien-hung-hero.jpg",
  "public/qr-vietinbank.jpg",
  "public/news/bayes-factor-table.png",
  "public/news/bayes-factor-jeffreys-scale.png",
];

for (const image of images) {
  const input = path.join(root, image);
  const output = input.replace(/\.(jpe?g|png)$/i, ".webp");

  await sharp(input).webp({ quality: 82 }).toFile(output);
  console.log(`${image} -> ${path.relative(root, output)}`);
}
