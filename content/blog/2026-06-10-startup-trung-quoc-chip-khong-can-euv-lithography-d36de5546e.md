---
title: "Startup Trung Quốc và tham vọng tạo chip không cần EUV lithography: Thực chất là gì, cơ hội và giới hạn"
slug: "startup-trung-quoc-chip-khong-can-euv-lithography"
date: "2026-06-10"
category: "Trí tuệ nhân tạo"
meta: "Phân tích tuyên bố “chip không cần EUV lithography”: các hướng thay thế EUV, đánh đổi yield/throughput/chi phí và tác động chuỗi cung ứng bán dẫn."
keywords:
  - "chip không cần EUV"
  - "EUV lithography"
  - "máy quang khắc cực tím"
source_url: ""
source_name: ""
automated: true
ai_category: ""
---

## Giới thiệu

Cụm từ “chip không cần EUV lithography” (máy quang khắc cực tím) nghe như một cú bẻ lái lớn của ngành công nghệ bán dẫn: bỏ qua thiết bị đắt đỏ bậc nhất trong dây chuyền sản xuất chip, giảm phụ thuộc vào ASML và né các hạn chế xuất khẩu. Nhưng trong bán dẫn, mọi tuyên bố “không cần EUV” đều phải được bóc tách kỹ: **không cần EUV cho node nào**, **dùng phương pháp thay thế gì**, và **đánh đổi ra sao về yield, throughput, chi phí/wafer**.

Bài viết này phân tích theo góc nhìn kỹ thuật và chuỗi cung ứng: thay vì dừng ở mức giật tít, ta đặt tuyên bố vào bối cảnh cạnh tranh bán dẫn, tự chủ bán dẫn, và các hướng thay thế EUV đang được nghiên cứu.

## Vì sao EUV là “nút thắt” của sản xuất chip hiện đại?

EUV lithography (quang khắc EUV) là nền tảng để chế tạo các **node tiến trình** tiên tiến (đặc biệt logic ở các thế hệ mới) với số lần patterning ít hơn so với DUV. EUV mạnh ở chỗ giúp tạo các cấu trúc rất nhỏ với quy trình “ngắn” hơn, từ đó giảm sai số chồng lớp (overlay), giảm độ phức tạp quy trình và thường cải thiện **tỉ lệ lỗi/yield** ở các lớp quan trọng.

Tuy nhiên, EUV lại là điểm nghẽn vì:

- **Chi phí và độ phức tạp cực cao**: một hệ EUV không chỉ là “một máy”, mà là hệ sinh thái gồm nguồn sáng, gương phản xạ siêu chính xác, buồng chân không, kiểm soát rung, đo kiểm và vật liệu.
- **Phụ thuộc chuỗi cung ứng bán dẫn**: ASML là nhà cung cấp gần như độc quyền; còn hệ sinh thái linh kiện then chốt (nguồn sáng, quang học, đo kiểm) phụ thuộc sâu vào mạng lưới phương Tây.
- **Rào cản địa chính trị**: hạn chế thiết bị chế tạo chip khiến “tự chủ bán dẫn” trở thành mục tiêu chiến lược; vì vậy những cách “giảm phụ thuộc EUV” trở thành xu hướng.

Điều quan trọng: “không cần EUV” **không đồng nghĩa** “tạo được chip tiên tiến hơn EUV”. Nó có thể chỉ có nghĩa là: *làm được một lớp/quy trình/loại chip nào đó bằng phương pháp khác*.

## “Chip không cần EUV” có thể hiểu theo những kịch bản nào?

Khi một startup Trung Quốc (hoặc bất kỳ bên nào) nói về chip không cần máy quang khắc cực tím, ta nên đặt câu hỏi: họ đang nói đến **thay thế EUV ở phần nào** và **nhắm tới phân khúc nào**. Có vài kịch bản thường gặp.

### 1) Dùng DUV multiple patterning để đi tiếp mà không có EUV

Đây là con đường “thực dụng” nhất: vẫn dùng **quang khắc DUV** nhưng tăng số bước chia mẫu (multiple patterning). Nó có thể giúp đạt kích thước hiệu dụng nhỏ hơn, nhưng đánh đổi rất rõ:

- **Chi phí tăng mạnh** do nhiều lần phơi/khắc/lắng đọng.
- **Throughput giảm** (ít wafer/giờ hơn) vì quy trình dài.
- **Rủi ro overlay** tăng: mỗi lần patterning là thêm một lần căn chỉnh, sai số cộng dồn ảnh hưởng yield.

Trong ngắn hạn, đây là cách “giảm phụ thuộc EUV” tương đối khả thi cho một số lớp và một số node, nhưng khó bền vững nếu mục tiêu là sản xuất chip tiên tiến quy mô lớn.

### 2) Nanoimprint lithography (NIL): dập khuôn thay vì “phơi sáng”

NIL là hướng “thay thế EUV” thường được nhắc đến: thay vì dùng ánh sáng để ghi mẫu, NIL dùng **khuôn (mold)** dập trực tiếp lên lớp resist.

Ưu điểm tiềm năng:

- Có thể đạt độ phân giải cao mà **không cần nguồn EUV**.
- Thiết bị có thể rẻ hơn EUV nếu giải được bài toán khuôn và lỗi.

Nhược điểm lớn:

- **Defectivity**: dập khuôn dễ tạo hạt lỗi/khuyết tật; ngành logic yêu cầu cực nghiêm.
- **Khuôn (template) là điểm sống còn**: chế tạo, bảo trì, tuổi thọ và việc sao chép khuôn đều là thách thức.
- Tương thích quy trình và kiểm soát biến dạng ở cấp nm khó.

NIL có thể phù hợp hơn với một số mảng (như một số lớp, hoặc các cấu trúc đặc thù), nhưng để thay EUV cho logic tiên tiến diện rộng, cần chứng minh yield và throughput ở mức công nghiệp.

### 3) Directed Self-Assembly (DSA): “tự sắp xếp” vật liệu để tạo mẫu

DSA tận dụng vật liệu polymer có khả năng tự sắp xếp theo khuôn định hướng, nhằm tạo các cấu trúc chu kỳ nhỏ hơn giới hạn quang học.

Điểm mạnh:

- Có thể giúp “nhân mật độ” đường nét từ một mẫu thô.
- Về lý thuyết giảm phụ thuộc vào độ phân giải quang khắc.

Điểm yếu:

- **Kiểm soát lỗi** và tính lặp lại là rào cản.
- Phù hợp với cấu trúc định kỳ hơn là layout logic phức tạp.

DSA thường được xem như công nghệ bổ trợ hơn là thay thế hoàn toàn EUV lithography.

### 4) Maskless lithography / e-beam đa chùm: bỏ mask, viết trực tiếp

E-beam direct write có độ phân giải cao, nhưng throughput là vấn đề. Các kiến trúc **multi-beam** cải thiện tốc độ, song để cạnh tranh với quang khắc trong high-volume manufacturing (HVM) vẫn khó.

Với startup, đây lại là hướng “có cửa” cho các ứng dụng đặc thù:

- Prototype nhanh.
- Sản lượng nhỏ, chip tùy biến.
- Một số lớp không yêu cầu throughput cao.

Nhưng nếu tuyên bố là “sản xuất chip” quy mô lớn, câu hỏi bắt buộc là **wafer per hour (wph)** và **chi phí/wafer**.

## Cách đánh giá một tuyên bố “thay thế EUV” mà không bị cuốn theo truyền thông

Trong lĩnh vực công nghệ bán dẫn, để phân biệt đột phá thật với thông điệp marketing, tối thiểu cần các chỉ số và câu trả lời sau.

### Những câu hỏi bắt buộc

1) **Node tiến trình / độ phân giải**: họ nhắm 28nm, 14nm, 7nm hay nhỏ hơn? Hay chỉ là một lớp/layer tương đương?

2) **Loại chip**: logic (CPU/GPU), memory (DRAM/NAND), RF, power, hay cảm biến? Mỗi loại có yêu cầu yield và layout rất khác.

3) **Mức sẵn sàng**: demo trong lab, pilot line hay đã HVM?

4) **Yield**: tỉ lệ die đạt chuẩn là bao nhiêu? Yield thấp khiến “làm được” không đồng nghĩa “bán được”.

5) **Throughput**: số wafer/giờ hoặc die/giờ? Đây là chìa khóa để cạnh tranh với EUV/DUV.

6) **Chi phí sở hữu (CoO)**: tính cả vật tư, hóa chất, mask/khuôn, downtime, bảo trì.

Nếu một tuyên bố “chip không cần EUV” thiếu các dữ liệu trên, bạn nên coi đó là *hướng nghiên cứu* hoặc *demo công nghệ* hơn là thay đổi cán cân cạnh tranh bán dẫn.

### Insight quan trọng: “Không cần EUV” không có nghĩa là thoát khỏi chuỗi cung ứng

Ngay cả khi bỏ EUV, dây chuyền sản xuất chip vẫn cần:

- **Thiết bị khắc (etch), lắng đọng (CVD/ALD), CMP**, metrology/inspection.
- Vật liệu: photoresist, hóa chất tinh khiết, wafer, khí hiếm.

Vì vậy xu hướng tự chủ bán dẫn không chỉ là thay thế một máy; nó là bài toán hệ sinh thái. Nhiều công nghệ “thay thế EUV” có thể lại tạo ra phụ thuộc mới (ví dụ phụ thuộc khuôn NIL, hoặc phụ thuộc hệ đo kiểm siêu chính xác).

## Xu hướng và tác động: vì sao cuộc đua “giảm phụ thuộc EUV” vẫn đáng theo dõi?

Dù chưa thể kết luận công nghệ nào sẽ “đánh bại EUV lithography”, xu hướng tìm cách thay thế EUV hoặc giảm vai trò EUV là có thật vì ba động lực:

- **Địa chính trị và hạn chế thiết bị chế tạo chip** thúc đẩy các quốc gia/chuỗi cung ứng tìm lối đi khác.
- **Chi phí leo thang**: EUV đắt, quy trình phức tạp; bất kỳ giải pháp nào giảm CoO hoặc giảm số bước cũng hấp dẫn.
- **Phân hóa thị trường**: không phải mọi sản phẩm đều cần node tiên tiến. Rất nhiều chip công nghiệp, ô tô, IoT chạy tốt ở node “trưởng thành”. Vì vậy, đổi mới công nghệ chip có thể tối ưu hiệu quả ở các phân khúc này mà không cần EUV.

Góc nhìn riêng: *cơ hội lớn nhất cho startup* thường nằm ở những “khe hở” của thị trường—các lớp/quy trình/ứng dụng mà EUV không tối ưu về chi phí, hoặc nơi DUV multiple patterning trở nên quá đắt. Startup có thể tạo giá trị bằng cách:

- Cung cấp công nghệ bổ trợ (metrology, inspection, vật liệu, phần mềm tối ưu mask/patterning).
- Tập trung vào một số lớp trọng yếu thay vì thay thế toàn bộ EUV.
- Tối ưu cho các node trung gian và các loại chip đặc thù, nơi yêu cầu throughput/yield “dễ thở” hơn.

## Kết luận

“Startup Trung Quốc tạo chip không cần máy quang khắc cực tím” là một tiêu đề đánh trúng mối quan tâm lớn của ngành: giảm phụ thuộc ASML và EUV lithography trong sản xuất chip. Nhưng xét ở góc độ công nghệ bán dẫn, cụm “không cần EUV” chỉ có ý nghĩa khi gắn với **phương pháp thay thế cụ thể** (DUV multiple patterning, nanoimprint lithography, DSA, e-beam…) và đi kèm các thước đo công nghiệp như **node, yield, throughput, chi phí/wafer**.

Xu hướng “thay thế EUV” sẽ còn nóng, nhưng đột phá thật sự không nằm ở việc tuyên bố bỏ EUV—mà ở chỗ chứng minh được một quy trình có thể chạy ổn định, sản lượng cao, lỗi thấp, và cạnh tranh kinh tế trong chuỗi cung ứng bán dẫn. Nếu bạn theo dõi chủ đề này, hãy luôn đọc kỹ phần dữ liệu kỹ thuật thay vì chỉ nhìn vào lời hứa truyền thông.
