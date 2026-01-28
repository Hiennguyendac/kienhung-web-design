# Kiến Hưng Investment Website

Website giới thiệu và truyền thông thương hiệu Kiến Hưng Investment, xây dựng bằng Vite + React + TypeScript. Dự án tập trung vào trải nghiệm doanh nghiệp, nội dung dịch vụ, tin tức, form liên hệ và các trang con theo lĩnh vực hoạt động.

## Mục tiêu

- Trình bày hình ảnh thương hiệu và dịch vụ một cách chuyên nghiệp.
- Cung cấp trang con cho từng lĩnh vực, tin tức, chính sách và liên hệ.
- Dễ mở rộng nội dung và triển khai tự động lên hosting cPanel.

## Công nghệ sử dụng

- Vite 5
- React 18 + TypeScript
- Tailwind CSS
- shadcn/ui
- React Router

## Cấu trúc chính

```
public/              # Tài nguyên tĩnh (favicon, robots, .htaccess, ảnh)
src/
  components/        # UI components
  pages/             # Trang chính và trang con
  integrations/      # Tích hợp dịch vụ (nếu có)
  styles/            # (nếu có) style bổ trợ
```

## Yêu cầu môi trường

- Node.js 20.x (khuyến nghị)
- npm 9+

## Cài đặt & chạy local

```bash
npm install
npm run dev
```

Mở trình duyệt: `http://localhost:8080`

## Build

```bash
npm run build
npm run preview
```

> Lưu ý: Vite sẽ copy mọi thứ trong `public/` sang `dist/`, bao gồm `.htaccess`, `robots.txt`, `favicon.jpg`.

## Cấu hình biến môi trường (nếu dùng)

Tạo file `.env.local` (không commit) và khai báo các biến cần thiết. Ví dụ:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Triển khai tự động qua GitHub Actions (cPanel FTP)

Workflow đã được cấu hình tại `.github/workflows/deploy.yml`.

### Secrets cần tạo trong GitHub

Vào **Settings → Secrets and variables → Actions** và tạo:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- (Tuỳ chọn) `FTP_PORT` nếu không dùng cổng 21

### Cách deploy

Mỗi lần push lên nhánh `main`, GitHub Actions sẽ:

1. Cài đặt dependencies
2. Build dự án (`dist/`)
3. Upload lên `public_html/` bằng FTP/FTPS

## Ghi chú

- `public/.htaccess` hỗ trợ SPA rewrite khi deploy trên Apache.
- `public/favicon.jpg` là favicon hiện tại của dự án.

## Liên hệ

- Website: https://kienhunginvest.vn
- Email: contact@kienhunginvest.com
