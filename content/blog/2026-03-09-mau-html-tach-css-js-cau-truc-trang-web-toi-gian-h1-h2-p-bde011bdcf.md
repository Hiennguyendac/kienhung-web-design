---
title: "Mẫu HTML tách CSS/JS: Cấu trúc trang web tối giản với thẻ H1, thẻ H2 và đoạn văn p"
slug: "mau-html-tach-css-js-cau-truc-trang-web-toi-gian-h1-h2-p"
date: "2026-03-09"
category: "Trí tuệ nhân tạo"
meta: "Mẫu HTML tối giản: container căn giữa với thẻ H1, thẻ H2, đoạn văn p. Tách CSS/JS, padding 16px, border-radius 8px, console.log Hello World."
keywords:
  - "mẫu HTML"
  - "cấu trúc trang web"
  - "CSS container"
source_url: ""
source_name: ""
automated: true
ai_category: ""
---

## Giới thiệu

Khi bắt đầu học front-end hoặc dựng một landing page đơn giản, nhiều người thường viết tất cả mọi thứ vào cùng một file: nội dung, style và cả script. Cách làm này nhanh, nhưng càng về sau càng khó mở rộng, khó debug và khó tái sử dụng. Vì vậy, một “mẫu HTML” tối giản nhưng đúng chuẩn kiến trúc là điểm khởi đầu rất đáng giá.

Bài viết này không bàn về tin tức hay các chủ đề ngoài phạm vi kỹ thuật. Thay vào đó, mình đi thẳng vào một **tài liệu HTML** mẫu để minh họa **cấu trúc trang web** cơ bản gồm một khối **CSS container** căn giữa với **thẻ H1**, **thẻ H2** và **đoạn văn p**; đồng thời tách riêng CSS để định dạng và JavaScript để log thông điệp. Mục tiêu là giúp bạn nắm tư duy *separation of concerns* (tách lớp trình bày và hành vi khỏi nội dung), đồng thời giữ UI tối giản, rõ ràng.

---

## Nền tảng: Tách HTML/CSS/JS theo “separation of concerns”

Trong phát triển web hiện đại, xu hướng phổ biến là tách ba mảng chính:

- **HTML**: mô tả cấu trúc và nội dung (semantic).
- **CSS**: lớp trình bày (màu sắc giao diện, bố cục, typography).
- **JavaScript**: hành vi (tương tác, xử lý dữ liệu, log, gọi API).

Đây không chỉ là “sở thích” mà là một thực hành giúp dự án:

- Dễ bảo trì: sửa giao diện không đụng logic, sửa logic không phá layout.
- Dễ mở rộng: thêm component, theme, hoặc module JS rõ ràng.
- Dễ làm việc nhóm: designer/FE/QA có thể chia phần.

Ngay cả với một ví dụ nhỏ như **Hello World**, việc tách CSS và JS ra khỏi **tài liệu HTML** cũng là thói quen tốt.

---

## Mẫu HTML: Container căn giữa, H1/H2 phân cấp, đoạn văn p rõ ràng

Một cấu trúc trang web tối giản thường có:

- Một `div` làm **container** để giới hạn chiều rộng và tạo khoảng thở.
- Tiêu đề chính bằng **thẻ H1**.
- Tiêu đề phụ hoặc mô tả phần bằng **thẻ H2**.
- Nội dung thân bài bằng **đoạn văn p**.

Điểm quan trọng về SEO và khả năng truy cập (accessibility):

- Chỉ nên có **một H1** cho trang (đa phần trường hợp).
- H2 dùng để phân cấp nội dung dưới H1.
- Nội dung nằm trong `p` rõ ràng giúp bot và người đọc hiểu nhanh.

Dưới đây là **mẫu HTML** tham khảo (file `index.html`). Lưu ý phần `<link>` để nhúng CSS riêng, và `<script>` để nhúng JS riêng.

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mẫu HTML tối giản</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="container">
    <h1>Xin chào từ mẫu HTML</h1>
    <h2>UI tối giản, phân cấp typography rõ ràng</h2>
    <p>
      Đây là tài liệu HTML minh họa cấu trúc trang web cơ bản với H1, H2 và đoạn văn p.
      CSS và JavaScript được tách riêng để dễ bảo trì.
    </p>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

Ở ví dụ này, `container` sẽ được dùng để xử lý bố cục căn giữa, padding, nền trắng, bo góc… Từ đó tạo một khối nội dung “card-like” rất phổ biến trong thiết kế UI tối giản.

---

## CSS: Màu sắc, font-size, padding, border-radius và text-align center

Phần CSS tập trung vào lớp trình bày: màu sắc giao diện, khoảng cách, độ bo góc, và typography.

Theo dữ liệu yêu cầu, ta dùng:

- `padding` container: **16px**
- `border-radius`: **8px**
- `font-size H1`: **24px**
- `font-size H2`: **18px**
- `màu H1`: **#ff6d5a**
- `màu H2`: **#909399**
- căn chữ: **text-align center**

File `styles.css`:

```css
:root {
  --color-h1: #ff6d5a;
  --color-h2: #909399;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  background: #f5f6f7;
  color: #222;
}

.container {
  max-width: 720px;
  margin: 48px auto;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.container h1 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-h1);
}

.container h2 {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-h2);
}

.container p {
  margin: 0;
  line-height: 1.6;
  font-size: 14px;
  color: #444;
}
```

### Góc nhìn UI/UX: Tối giản nhưng “đúng chất”

- Nền `#fff` + bo góc **8px** tạo cảm giác sạch sẽ, hiện đại.
- Typography phân cấp (H1 24px, H2 18px) giúp mắt người “quét” thông tin theo thứ tự.
- `padding: 16px` là mức phổ biến để khối nội dung không bị bí.

Đây là một ví dụ điển hình của trend **UI tối giản**: ít màu, ít chi tiết, nhưng rõ ràng về hệ thống phân cấp.

---

## JavaScript: Hành vi tối thiểu với console.log “Hello World”

Với ví dụ cơ bản, JavaScript chỉ cần làm một việc: xác nhận file script đã được tải và chạy.

File `script.js`:

```js
console.log("Hello World!");
```

Tuy nhỏ, nhưng nó minh họa đúng nguyên tắc: HTML là cấu trúc, CSS là trình bày, JS là hành vi. Khi mở DevTools (F12) → Console, bạn sẽ thấy output **"Hello World!"**.

### Mở rộng hợp lý sau “Hello World”

Khi đã có khung, bạn có thể mở rộng JS theo hướng an toàn và có tổ chức:

- Thêm event click để đổi nội dung trong `p`.
- Gắn data attribute vào HTML thay vì hardcode trong JS.
- Tách module nếu logic tăng lên.

Nhưng ở cấp độ “starter template”, việc chỉ dùng `JavaScript console.log` là vừa đủ để xác thực luồng tải file.

---

## Insights: Khi dữ liệu đầu vào là template, đừng kỳ vọng insight theo chủ đề tin tức

Một điểm quan trọng về biên tập nội dung tech: đôi khi tiêu đề/nhãn chuyên mục được gắn vào một nguồn, nhưng body thực tế lại chỉ là template kỹ thuật. Trong trường hợp này, dữ liệu bạn có là **mẫu HTML/CSS/JS minh họa**, không có thông tin định lượng hay diễn biến liên quan đến một chủ đề tin tức.

Vì vậy:

- Không thể rút trích insight kiểu “thị trường”, “startup”, “VC”… nếu không có nội dung văn bản tương ứng.
- Nếu mục tiêu là SEO dạng tin/bài phân tích theo sự kiện, cần cung cấp body bài viết thật (text) thay vì chỉ đưa template.

Ngược lại, nếu mục tiêu SEO thuộc mảng lập trình cơ bản, template này lại rất “đúng nhu cầu”: nó chứa từ khóa rõ ràng như **mẫu HTML**, **cấu trúc trang web**, **CSS container**, **thẻ H1**, **thẻ H2**, **đoạn văn p**, **padding**, **border-radius**, **màu sắc giao diện**, **font-size**, **font-weight**, và **Hello World**.

---

## Kết luận

Một **tài liệu HTML** tối giản nhưng chuẩn mực có thể là nền móng cho rất nhiều sản phẩm web về sau. Với một **mẫu HTML** gồm container căn giữa, **thẻ H1**, **thẻ H2**, **đoạn văn p**, cộng thêm CSS tách riêng để kiểm soát `padding: 16px`, `border-radius: 8px`, phân cấp `font-size` và màu sắc giao diện, bạn đã có một bố cục sạch, dễ đọc, hợp trend UI tối giản.

Quan trọng hơn, việc tách CSS và JavaScript (chỉ `console.log("Hello World!")`) khỏi HTML giúp bạn đi đúng hướng *separation of concerns*—một nguyên tắc nhỏ nhưng tạo khác biệt lớn khi dự án bắt đầu phình to.
