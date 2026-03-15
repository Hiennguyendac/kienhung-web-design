---
title: "HTML cơ bản, CSS và JavaScript: Dựng trang web tĩnh tối giản với div container, thẻ h1/h2/p và console.log"
slug: "html-co-ban-css-javascript-trang-web-tinh-toi-gian-div-container-h1-h2-p-console-log"
date: "2026-03-15"
category: "Trí tuệ nhân tạo"
meta: "Hướng dẫn HTML cơ bản với div container, thẻ h1/h2/p, style CSS (padding, border-radius, căn giữa) và JavaScript console.log cho trang web tĩnh."
keywords:
  - "HTML cơ bản"
  - "style CSS"
  - "console.log"
source_url: ""
source_name: ""
automated: true
ai_category: ""
---

## Giới thiệu

Trong nhiều dự án front-end, bạn sẽ gặp những “mẫu trang” (template) cực kỳ ngắn: vài thẻ HTML cơ bản để dựng cấu trúc, một lớp **style CSS** tối giản để nhìn “ra dáng giao diện”, và một đoạn **JavaScript** ngắn chỉ để kiểm tra script có chạy hay không bằng **console.log**. Nghe đơn giản, nhưng đây lại là nền tảng quan trọng để hiểu cách một **trang web tĩnh** được hình thành, cũng như vì sao xu hướng hiện nay luôn nhấn mạnh việc tách bạch cấu trúc (HTML) và trình bày (CSS).

Bài viết này đi theo hướng kỹ thuật thuần túy: phân tích cấu trúc tài liệu **HTML cơ bản** với `head`, `body`, một `div container`, các thẻ `h1`, `h2`, `p`; sau đó “đắp” CSS để tạo UI tối giản (nền trắng, căn giữa, padding, bo góc, màu typography); cuối cùng thêm JavaScript tối giản với `console.log("Hello World!")` để kiểm tra môi trường chạy JS trong trình duyệt.

## Phân tích cấu trúc HTML cơ bản: head, body và div container

Điểm khác biệt giữa một file HTML “chạy được” và một đoạn markup rời rạc nằm ở tính đầy đủ của cấu trúc tài liệu. Một mẫu nhập môn đúng chuẩn thường gồm 3 phần: `<!DOCTYPE html>`, thẻ gốc `html`, và hai nhánh `head` / `body`.

- `head` là nơi chứa metadata và tài nguyên (meta charset, tiêu đề trang, CSS, script…). Trong một trang đơn file, CSS có thể đặt trong `style` ở `head`.
- `body` là nội dung hiển thị thật sự: tiêu đề, đoạn văn, nút bấm, layout…

Một chi tiết hay bị xem nhẹ nhưng lại là “chuẩn nền” cho tiếng Việt và đa ngôn ngữ: khai báo **UTF-8** trong `meta charset`. Điều này giúp trình duyệt hiển thị ký tự có dấu chính xác.

Ví dụ cấu trúc tối thiểu (rút gọn để bạn thấy bố cục):

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Trang web tĩnh tối giản</title>
</head>
<body>
  <div class="container">
    <h1>Tiêu đề chính</h1>
    <h2>Tiêu đề phụ</h2>
    <p>Nội dung mô tả...</p>
  </div>
</body>
</html>
```

Ở đây, `div container` đóng vai trò “khung” (wrapper) để gom nội dung thành một khối có thể định dạng đồng nhất. Trong thực tế thiết kế giao diện, container giúp bạn kiểm soát **padding**, căn giữa văn bản, chiều rộng, nền, bóng… mà không phải gán style rải rác cho từng phần tử.

Về semantic: `h1` nên là tiêu đề quan trọng nhất của trang; `h2` là các section cấp dưới; `p` dành cho đoạn văn. Việc dùng đúng **thẻ h1**, **thẻ h2**, **thẻ p** không chỉ giúp người đọc dễ scan nội dung mà còn hỗ trợ SEO và khả năng truy cập (accessibility).

## CSS tối giản cho UI: nền trắng, căn giữa, padding, border-radius và typography

Một trang HTML “trần” thường khó đọc và không tạo cảm giác hoàn chỉnh. Chỉ cần vài thuộc tính CSS cơ bản, bạn có thể tạo ra giao diện tối giản đúng xu hướng hiện nay: sạch, rõ thứ bậc, ít nhiễu.

Trong mẫu dữ liệu minh họa, style tập trung vào `.container` và typography cho `h1`/`h2`:

- Container:
  - `background-color: #ffffff;` tạo nền trắng (đúng kiểu UI tối giản).
  - `padding: 16px;` tăng khoảng thở, giúp nội dung không dính sát mép.
  - `border-radius: 8px;` bo góc, tạo cảm giác “thẻ” (card) hiện đại.
  - `text-align: center;` **căn giữa văn bản**, phù hợp với layout giới thiệu, landing đơn giản.

- Typography:
  - `h1` màu nhấn `#ff6d5a`, `font-size: 24px`, nhấn mạnh thứ bậc chính.
  - `h2` màu trung tính `#909399`, `font-size: 18px`, làm tiêu đề phụ nhẹ hơn.

Một đoạn **style CSS** đầy đủ có thể như sau:

```html
<style>
  body {
    background-color: #f5f6f7;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    margin: 0;
    padding: 24px;
  }

  .container {
    max-width: 720px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
  }

  h1 {
    color: #ff6d5a;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 8px;
  }

  h2 {
    color: #909399;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 12px;
  }

  p {
    margin: 0;
    line-height: 1.6;
    color: #2c2c2c;
  }
</style>
```

Góc nhìn kỹ thuật: xu hướng tốt nhất là tách CSS ra file riêng (ví dụ `styles.css`) để dễ cache, tái sử dụng, và tránh làm `head` phình to. Tuy nhiên, trong bối cảnh minh họa hoặc prototype nhanh, để CSS inline trong cùng tài liệu giúp bạn “copy-paste chạy ngay” — đây chính là mâu thuẫn thú vị giữa **best practice** và **tính thực dụng**.

Một insight đáng chú ý: thông số `padding 16px` và `border-radius 8px` xuất hiện rất nhiều trong các design system phổ biến (Material-ish, card UI), vì chúng cân bằng được khả năng đọc và cảm giác hiện đại trên cả desktop lẫn mobile.

## JavaScript tối giản: console.log để kiểm tra môi trường chạy

Trong nhiều template nhập môn, JavaScript được thêm vào không phải để tạo tính năng, mà để xác nhận “đường ống” hoạt động: file HTML load xong, script chạy, trình duyệt không chặn.

Ví dụ tối giản:

```html
<script>
  console.log("Hello World!");
</script>
```

Tại sao **console.log** lại quan trọng trong giai đoạn đầu?

- Nó là phép thử nhanh nhất để biết script đã được nạp.
- Nó giúp debug theo luồng: bạn đặt log trước/sau một thao tác để biết đoạn nào chạy.
- Khi học JavaScript, console là “môi trường phản hồi tức thì” (instant feedback), tương tự REPL.

Nếu bạn muốn đúng chuẩn hơn về thứ tự tải, có 2 lựa chọn phổ biến:

1) Đặt `<script>` ngay trước `</body>` để đảm bảo DOM đã render.
2) Dùng `defer` nếu script nằm trong `head`:

```html
<script defer src="app.js"></script>
```

Nhưng trong ví dụ một file, việc để `<script>` trong file và log ra console phản ánh đúng thói quen phát triển front-end: kiểm tra nhanh, sau đó mới tăng độ phức tạp.

## Trends & Insights: Tách bạch cấu trúc/trình bày, UI tối giản và dấu hiệu “template placeholder”

### 1) Trend: Tách bạch HTML và CSS (nhưng vẫn cần mẫu inline)

Ngành web ngày càng tiêu chuẩn hóa việc phân lớp:

- HTML: mô tả cấu trúc và ý nghĩa nội dung.
- CSS: chịu trách nhiệm trình bày.
- JavaScript: thêm hành vi.

Tuy vậy, ví dụ minh họa thường “để chung một file” vì mục tiêu giáo dục và tốc độ thử nghiệm. Đây là lý do bạn vẫn gặp CSS trong `style` và JS trong `script` cùng HTML, dù không phải tối ưu cho dự án lớn.

### 2) Trend: UI tối giản, typography rõ thứ bậc

Thiết kế giao diện tối giản không chỉ là “ít màu” mà là ưu tiên độ rõ ràng:

- Dùng màu nhấn cho `h1` để tạo điểm neo thị giác.
- Dùng màu trung tính cho `h2` để phân cấp.
- Dùng nền trắng + bo góc để tạo card.

Các keyword như **màu sắc typography**, **thiết kế giao diện**, **căn giữa văn bản**, **padding**, **border-radius** đều phản ánh đúng nhu cầu UI thực tế, dù không có framework.

### 3) Insight: Dữ liệu mang tính placeholder, phù hợp tutorial hơn nội dung thời sự

Một dấu hiệu rõ ràng của “template/placeholder” là nội dung chỉ tập trung vào cấu trúc HTML/CSS/JS cơ bản mà không có ngữ cảnh, trích dẫn, số liệu hay thực thể liên quan đến một chủ đề cụ thể. Vì thế, thay vì cố gắn nó vào một bài phân tích khác lĩnh vực, cách đúng đắn là coi đây như một snippet phục vụ hướng dẫn nhập môn.

Nếu mục tiêu của bạn là SEO theo một tiêu đề thời sự, bạn cần thêm phần nội dung văn bản có chủ đề, số liệu, thực thể và lập luận. Còn với mục tiêu SEO tech, snippet này lại rất phù hợp cho người mới bắt đầu học **HTML cơ bản**, **CSS**, **JavaScript**.

## Kết luận

Một trang web tĩnh tối giản có thể được dựng nhanh từ 3 mảnh ghép: **HTML cơ bản** (head/body + `div container` và các thẻ `h1`, `h2`, `p`), **style CSS** tập trung vào nền trắng, căn giữa, `padding 16px`, `border-radius 8px` và typography, cùng **JavaScript** tối giản với `console.log("Hello World!")` để kiểm tra script chạy trong trình duyệt.

Dù đây là ví dụ nhỏ, nó phản ánh đúng xu hướng phát triển front-end hiện đại: giữ cấu trúc rõ ràng, trình bày tối giản và kiểm thử nhanh. Khi bạn nắm chắc mẫu này, việc mở rộng sang layout phức tạp hơn, tách file CSS/JS, hoặc áp dụng framework sẽ trở nên dễ và “có nền” hơn nhiều.