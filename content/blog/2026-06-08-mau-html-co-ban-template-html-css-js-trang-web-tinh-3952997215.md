---
title: "Mẫu HTML cơ bản: Template HTML CSS JS cho trang web tĩnh (cấu trúc chuẩn, UI tối giản, nhúng JavaScript)"
slug: "mau-html-co-ban-template-html-css-js-trang-web-tinh"
date: "2026-06-08"
category: "Trí tuệ nhân tạo"
meta: "Mẫu HTML cơ bản kèm template HTML CSS JS: cấu trúc head/body, thẻ H1 H2, CSS container căn giữa, padding, border-radius, nhúng JavaScript console.log."
keywords:
  - "mẫu HTML"
  - "cấu trúc HTML cơ bản"
  - "template HTML CSS JS"
source_url: ""
source_name: ""
automated: true
ai_category: ""
---

## Giới thiệu

Trong thế giới front-end, dù bạn đang làm landing page, trang giới thiệu sản phẩm hay một POC (proof of concept) nội bộ, điểm khởi đầu vẫn thường là một **mẫu HTML** tối giản nhưng “đủ chuẩn”: có **cấu trúc HTML cơ bản**, có style để nhìn ổn ngay từ đầu, và có một đoạn script để kiểm tra luồng hành vi. 

Điều thú vị là đôi khi tiêu đề/nguồn tham chiếu mang ngữ cảnh công nghệ rất “nóng” (ví dụ một bài nói về startup), nhưng nội dung bạn nhận được lại là một template HTML/CSS/JS. Đây không chỉ là chuyện “lệch đề” — nó phản ánh một vấn đề quen thuộc trong pipeline biên tập/scraping: dữ liệu có thể bị trộn placeholder. Vì vậy, bài này sẽ đi đúng vào phần hữu ích: cung cấp một **template HTML CSS JS** hoàn chỉnh, giải thích vì sao cấu trúc này phổ biến, và chỉ ra best practice khi chuyển từ demo sang sản phẩm thật.

---

## 1) Cấu trúc HTML cơ bản: nền móng cho mọi trang web tĩnh

Một **trang web tĩnh** tối thiểu thường có bộ khung:

- `<!doctype html>` khai báo chuẩn HTML5.
- `<html lang="vi">` giúp SEO/ngôn ngữ hiển thị.
- `<head>` chứa metadata, title, viewport.
- `<body>` chứa nội dung hiển thị.

Bên trong `<body>`, ví dụ cơ bản nhất để luyện “content structure” là sử dụng **thẻ H1 H2** và đoạn văn (`<p>`). Tại sao? Vì heading hierarchy là xương sống SEO và accessibility.

- **H1**: tiêu đề chính của trang (thường chỉ 1 H1).
- **H2**: chia nhóm nội dung.
- **p**: mô tả chi tiết.

Điểm cần lưu ý khi bạn dùng mẫu HTML cho dự án thật:

- Đừng dùng heading chỉ để “làm chữ to” — hãy dùng CSS để điều chỉnh typography.
- Giữ cấu trúc logic: H1 → H2 → H3… không nhảy cóc.
- Với trang public, thêm mô tả (`meta description`) và social tags (Open Graph) để chia sẻ đẹp.

---

## 2) CSS container & typography: UI tối giản theo xu hướng “card-like”

Một trend rất ổn định trong UI hiện đại là “card-based layout”: nội dung nằm trong một **CSS container** nền trắng, có padding và bo góc, đặt trên nền tổng thể nhẹ nhàng. Kiểu này vừa dễ đọc, vừa phù hợp nhiều loại nội dung (blog, form, landing page).

Các thuộc tính cốt lõi của container thường gồm:

- **căn giữa nội dung**: dùng `margin: 0 auto;` kết hợp `max-width`.
- **padding**: tạo khoảng thở (ví dụ `padding: 16px;` là mức phổ thông cho mobile/desktop).
- **border-radius**: tạo cảm giác mềm (ví dụ `border-radius: 8px;`).
- **màu sắc giao diện**: nền container `#ffffff`, nền body xám nhạt để tách lớp.

Về **typography**, một template chuẩn thường định nghĩa luôn:

- H1: khoảng **24px**, màu nổi bật (ví dụ `#ff6d5a`) để dẫn mắt.
- H2: khoảng **18px**, màu trung tính (ví dụ `#909399`) để phân cấp.
- line-height hợp lý để tăng khả năng đọc.

Đây là một điểm đáng giá của việc “set sẵn” style: bạn có ngay một baseline UI. Khi mở rộng dự án, bạn có thể:

- Chuyển các giá trị màu/kích cỡ thành CSS variables (design tokens).
- Tách CSS ra file riêng để cache tốt hơn.
- Chuẩn hóa font stack hoặc dùng webfont có tối ưu preload.

---

## 3) Nhúng CSS/JavaScript: ví dụ tối giản cho structure + style + behavior

Xu hướng phát triển web hiện đại vẫn xoay quanh tam giác nền tảng:

- **HTML (structure)**: nội dung và ngữ nghĩa.
- **CSS (style)**: giao diện.
- **JS (behavior)**: hành vi/logic.

Ngay cả khi bạn viết một demo rất nhỏ, việc minh họa đủ 3 phần giúp người mới hiểu đúng mô hình tách lớp.

### Nhúng CSS (inline trong `<style>`) khi nào hợp lý?

Trong template, bạn có thể **nhúng CSS** trực tiếp trong `<head>` bằng thẻ `<style>`. Cách này phù hợp khi:

- Bạn làm demo nhanh, chia sẻ snippet.
- Bạn muốn 1 file HTML chạy ngay không phụ thuộc asset.

Nhưng khi làm sản phẩm thật, nên:

- Tách ra file `.css` để trình duyệt cache.
- Dùng bundler/minifier (Vite, webpack, esbuild) để tối ưu.

### Nhúng JavaScript (inline trong `<script>`) và ví dụ `console.log`

Một đoạn **nhúng JavaScript** tối giản nhất là:

- đặt `<script>` cuối `body` để tránh block render.
- gọi `console.log('Hello World!')` để kiểm tra script hoạt động.

`console.log` không phải tính năng “end-user”, nhưng cực hữu ích cho:

- kiểm tra wiring giữa HTML và JS.
- xác nhận thứ tự chạy code.

Từ điểm bắt đầu này, bạn có thể nâng cấp thành:

- bắt sự kiện click.
- validate form.
- gọi API.

### Insight quan trọng: demo inline ≠ production-ready

Inline style/script là cách tốt để học và prototype. Tuy nhiên, production cần cân nhắc:

- **CSP (Content Security Policy)**: nhiều hệ thống chặn inline script để giảm rủi ro XSS.
- Tách file JS để cache và quản lý dependency.
- Kiểm soát third-party script.

Nói cách khác, mẫu đơn giản giúp bạn “nhìn thấy ngay”, nhưng chuẩn triển khai giúp bạn “sống được lâu”.

---

## 4) Template HTML CSS JS hoàn chỉnh (1 file) + gợi ý nâng cấp

Dưới đây là **template HTML CSS JS** theo đúng tinh thần: cấu trúc chuẩn, container card-like, typography rõ ràng, và JavaScript chạy `console.log`.

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mẫu HTML cơ bản - Template HTML CSS JS</title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      background: #f2f3f5;
      color: #1f2328;
    }

    .container {
      max-width: 720px;
      margin: 0 auto; /* căn giữa nội dung */
      padding: 16px; /* padding */
      background: #ffffff; /* màu sắc giao diện */
      border-radius: 8px; /* border-radius */
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    }

    h1 {
      margin: 0 0 12px;
      font-size: 24px;
      color: #ff6d5a;
      letter-spacing: -0.2px;
    }

    h2 {
      margin: 18px 0 8px;
      font-size: 18px;
      color: #909399;
      font-weight: 600;
    }

    p {
      margin: 0 0 10px;
      line-height: 1.6;
      font-size: 15px;
    }

    code {
      padding: 2px 6px;
      border-radius: 6px;
      background: #f6f8fa;
      border: 1px solid #eaeef2;
    }
  </style>
</head>
<body>
  <main class="container">
    <h1>Mẫu HTML cơ bản</h1>
    <p>Đây là ví dụ một trang web tĩnh với cấu trúc HTML cơ bản, có CSS container và nhúng JavaScript.</p>

    <h2>Thẻ H1 H2 và đoạn văn</h2>
    <p>Dùng <code>&lt;h1&gt;</code> cho tiêu đề chính, <code>&lt;h2&gt;</code> cho nhóm nội dung và <code>&lt;p&gt;</code> cho đoạn mô tả.</p>

    <h2>Nhúng JavaScript</h2>
    <p>Mở DevTools (Console) để xem thông báo log.</p>
  </main>

  <script>
    console.log('Hello World!');
  </script>
</body>
</html>
```

Gợi ý nâng cấp nhanh để template “đáng dùng” hơn trong dự án:

- Thêm `meta description` và Open Graph.
- Tách CSS/JS ra file riêng khi bắt đầu có nhiều thành phần.
- Thiết lập CSP nếu bạn deploy môi trường nghiêm ngặt.

---

## Kết luận

Một **mẫu HTML** tốt không cần phức tạp: chỉ cần **cấu trúc HTML cơ bản** đúng chuẩn, có **CSS container** với padding/bo góc/typography hợp lý, và một đoạn **nhúng JavaScript** tối giản như `console.log` để xác nhận hành vi. Template dạng 1 file là lựa chọn tuyệt vời cho học tập và demo, nhưng khi lên production, hãy tách lớp rõ ràng (HTML/CSS/JS), tối ưu cache và chú ý bảo mật (đặc biệt là CSP).

Nếu bạn đang cần một nền móng sạch để bắt đầu xây trang web tĩnh hoặc thử nghiệm front-end cơ bản, template ở trên là điểm xuất phát “đủ nhanh” và “đủ đúng”.