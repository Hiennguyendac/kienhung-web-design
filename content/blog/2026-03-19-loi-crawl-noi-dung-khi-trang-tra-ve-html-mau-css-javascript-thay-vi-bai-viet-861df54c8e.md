---
title: "Lỗi crawl nội dung: Khi trang trả về HTML mẫu, CSS, JavaScript thay vì bài viết (cách phát hiện và xử lý)"
slug: "loi-crawl-noi-dung-khi-trang-tra-ve-html-mau-css-javascript-thay-vi-bai-viet"
date: "2026-03-19"
category: "Trí tuệ nhân tạo"
meta: "Phân tích lỗi crawl khi trang chỉ trả về HTML mẫu/CSS/JS thay vì nội dung. Cách nhận biết, kiểm tra DOM, SSR/CSR, anti-bot và khắc phục."
keywords:
  - "lỗi crawl nội dung"
  - "HTML mẫu"
  - "cấu trúc DOM"
source_url: ""
source_name: ""
automated: true
ai_category: ""
---

## Giới thiệu

Trong nhiều dự án SEO/Content Tech, pipeline thu thập dữ liệu (crawl) thường được kỳ vọng “lấy được bài báo và trích xuất ý chính”. Nhưng một lỗi rất hay gặp là hệ thống không lấy được nội dung thật, mà chỉ nhận về **HTML mẫu**: vài thẻ H1/H2 placeholder, một **div container**, ít **style nội tuyến**, và một đoạn **JavaScript** kiểu `console.log(...)`. Kết quả là toàn bộ khâu NLP/SEO sau đó bị “đói dữ liệu”: không có phát biểu, số liệu, bối cảnh hay lộ trình để phân tích.

Bài viết này đi sâu vào dấu hiệu nhận biết, nguyên nhân và cách khắc phục tình trạng **template trang** thay thế body thực. Mục tiêu không phải bàn về một chủ đề báo chí cụ thể, mà là cung cấp góc nhìn kỹ thuật: kiểm tra **cấu trúc DOM**, phân biệt **trang tĩnh** với trang render động, và tối ưu quy trình trích xuất nội dung.

## Phân tích chi tiết

### 1) Dấu hiệu “trả về template”: Khi markup đẹp nhưng content rỗng

Một trong những dấu hiệu rõ nhất là nội dung thu được trông giống một skeleton UI:

- Có **thẻ H1** và **thẻ H2** nhưng nội dung mang tính chung chung (ví dụ “Bài viết”, “Tiêu đề”, “Đoạn giới thiệu”), không có tên người, địa danh, sự kiện.
- Phần body chủ yếu là **markup** cho giao diện: nhiều `div` bọc `container`, `row`, `card`… nhưng ít thẻ `article`/`p` chứa văn bản dài.
- Xuất hiện **CSS** dạng minh họa như `font-size: 24px/18px`, `padding: 16px/8px`, `border-radius: 8px` — những con số quen thuộc của template trang.
- Có **script** rất cơ bản kiểu `console.log('...')` hoặc vài event listener, nhưng không thấy dữ liệu nội dung.

Về mặt thực hành, bạn có thể đặt một rule kiểm tra nhanh: nếu tỷ lệ ký tự văn bản trong các thẻ `p`, `article`, `h1-h3` dưới ngưỡng (ví dụ < 1.500–2.000 ký tự) trong khi số lượng `div` lớn bất thường, đó là dấu hiệu mạnh của lỗi crawl nội dung.

**Insight quan trọng:** Nhiều hệ thống thu thập vẫn “đánh dấu thành công” vì HTTP 200 và HTML hợp lệ, nhưng thực chất chỉ lấy được **template**. Đây là lỗi logic phổ biến trong pipeline: validate theo status code thay vì validate theo “độ giàu nội dung”.

### 2) Nguyên nhân gốc: SSR/CSR, anti-bot, và lỗi parse tầng DOM

Có 3 nhóm nguyên nhân phổ biến khiến nguồn trả về skeleton HTML:

#### a) Trang render bằng JavaScript (CSR) nhưng crawler không chạy JS

Nhiều website hiện đại dùng client-side rendering: server chỉ trả về khung HTML và JS bundle; nội dung thật được fetch qua API rồi render vào DOM sau.

Nếu crawler chỉ tải HTML thô (không headless browser), bạn sẽ chỉ thấy:

- `div id="app"` rỗng hoặc gần rỗng
- link CSS/JS
- vài placeholder

**Trend:** Trong hệ sinh thái web hiện nay, CSR/SPA vẫn rất phổ biến vì tốc độ phát triển UI. Điều này khiến các pipeline crawl kiểu “GET HTML rồi parse” ngày càng dễ thất bại nếu không có chiến lược render.

#### b) Chặn bot/anti-scraping trả về trang thay thế

Một số hệ thống anti-bot sẽ trả về trang khác nhau tùy User-Agent, cookie, geolocation hoặc tần suất truy cập. Thay vì trả mã lỗi, họ trả một template “an toàn”: nhìn hợp lệ, nhưng không có nội dung. Đây là cách tránh bot nhận biết dễ dàng.

Dấu hiệu nhận biết:

- HTML thu được khác với HTML khi mở bằng trình duyệt thật
- Cần cookie/session mới thấy nội dung
- Có đoạn script kiểm tra hành vi, hoặc yêu cầu bật JS

#### c) Lỗi parse: chọn sai selector hoặc loại bỏ nhầm thẻ

Ngay cả khi HTML đã có nội dung, parser vẫn có thể làm “mất bài” nếu:

- Bạn chọn selector không đúng (ví dụ parse `.content` nhưng site dùng `article.fck_detail`)
- Bạn chạy bước “clean HTML” quá mạnh, xóa luôn thẻ `p` vì tưởng là quảng cáo
- Bạn xử lý DOM sai thứ tự (sanitize trước khi extract)

**Insight:** Với các hệ thống trích xuất, lỗi hay gặp nhất không phải thiếu dữ liệu từ nguồn, mà là “tự tay xóa” dữ liệu do rule làm sạch quá quyết liệt.

### 3) Cách phát hiện sớm trong pipeline: Bộ kiểm tra chất lượng nội dung (Content QA)

Để tránh đưa template vào khâu phân tích, nên có một lớp QA tự động:

#### a) Kiểm tra mật độ văn bản (text density)

Tính tỷ lệ ký tự text / số node DOM hoặc / tổng độ dài HTML. Template trang thường có HTML dài nhưng text ít.

- Nếu text density thấp bất thường → gắn cờ “skeleton”.

#### b) Kiểm tra cấu trúc nội dung tối thiểu

Một bài báo thật thường có:

- Ít nhất 5–10 thẻ `p` có độ dài > 80 ký tự
- Một cụm `article` hoặc vùng nội dung chính rõ ràng
- Tiêu đề H1 không mang tính placeholder

Nếu chỉ có H1/H2 chung chung + vài đoạn ngắn → nghi vấn.

#### c) So sánh với “trình duyệt thật” (headless snapshot)

Lấy 2 phiên bản:

- HTML thô (requests)
- HTML sau render (Playwright/Puppeteer)

Nếu bản render có thêm hàng nghìn ký tự văn bản trong DOM → xác nhận site dùng CSR hoặc bị anti-bot theo UA.

#### d) Log đầy đủ: URL, status, redirect, size, hash

Template thường lặp lại giữa nhiều URL (cùng hash hoặc cực kỳ giống nhau). Nếu 100 URL khác nhau trả về HTML gần như giống hệt, bạn đang crawl nhầm template.

### 4) Chiến lược xử lý: Từ “lấy HTML” sang “lấy nội dung”

Dưới đây là các hướng xử lý theo thứ tự ưu tiên (tùy tài nguyên):

#### a) Trích xuất đúng vùng nội dung (DOM extraction)

- Ưu tiên các thẻ sematic: `article`, `main`
- Nếu không có, dùng heuristic: node có nhiều `p` nhất, nhiều text nhất
- Tránh phụ thuộc cứng vào class vì website đổi giao diện thường xuyên

Tối ưu quy trình:

1) Parse DOM
2) Identify main content candidate
3) Extract text
4) Sau đó mới clean (loại bỏ menu, footer, share button)

#### b) Render bằng headless khi cần

Với CSR, bạn gần như bắt buộc cần headless browser để có DOM đầy đủ.

- Playwright thường ổn định hơn khi xử lý website hiện đại
- Chờ `networkidle` hoặc chờ selector `article` xuất hiện

Tuy nhiên, headless tốn tài nguyên; vì vậy hãy kết hợp với QA để chỉ render khi nghi vấn template.

#### c) Tìm API nội dung (nếu hợp lệ)

Nhiều site tải nội dung qua endpoint JSON. Nếu được phép, có thể gọi API trực tiếp để giảm chi phí render.

Cách tìm:

- Mở DevTools → Network → lọc XHR/fetch
- Tìm response có trường `content`, `body`, `title`

#### d) Xử lý anti-bot một cách “đúng mực”

Nếu nguồn yêu cầu cookie/JS, hãy:

- Tôn trọng robots.txt và điều khoản sử dụng
- Giảm tần suất, cache kết quả
- Dùng user-agent hợp lý và quản lý session

Mục tiêu là ổn định pipeline, không phải “vượt rào”.

## Kết luận

Khi hệ thống thu thập trả về **HTML mẫu** với vài **thẻ H1**, **thẻ H2**, một **div container**, ít **CSS** và một đoạn **JavaScript** như `console.log`, đó không phải “bài viết ngắn” mà là dấu hiệu điển hình của **lỗi crawl nội dung**. Gốc rễ thường đến từ khác biệt SSR/CSR, anti-bot, hoặc parser chọn sai vùng trong **cấu trúc DOM**.

Để xử lý triệt để, bạn cần thêm lớp Content QA (text density, cấu trúc tối thiểu), so sánh HTML thô với DOM sau render, và ưu tiên chiến lược trích xuất nội dung theo heuristic thay vì phụ thuộc template. Làm tốt phần này sẽ giúp pipeline SEO/Content Tech tránh phân tích nhầm “markup” và tạo ra insight sai ngay từ đầu.
