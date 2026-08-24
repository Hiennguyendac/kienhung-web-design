---
title: "Waymo tự thiết kế chip 5 nm: mảnh ghép để robotaxi rẻ hơn, phản ứng nhanh hơn và tiến gần bài toán lợi nhuận"
slug: "waymo-chip-5nm-asic-robotaxi-ojai-top-1000-tops"
date: "2026-08-24"
category: "Trí tuệ nhân tạo"
description: "Waymo công bố chip ASIC 5 nm cho robotaxi Ojai với hơn 1.000 TOPS, nhắm tối ưu chi phí và hiệu năng khi mở rộng tại các đô thị. Bài viết phân tích chiến lược tích hợp dọc, hệ sinh thái đối tác bán dẫn và các rủi ro chính sách liên quan cảm biến/lidar."
meta: "Waymo công bố chip ASIC 5 nm cho robotaxi Ojai với hơn 1.000 TOPS, nhắm tối ưu chi phí và hiệu năng khi mở rộng tại các đô thị. Bài viết phân tích chiến lược tích hợp dọc, hệ sinh thái đối tác bán dẫn và các rủi ro chính sách liên quan cảm biến/lidar."
image: "https://techcrunch.com/wp-content/uploads/2026/08/waymo-ojai.jpg?resize=1200,675"
image_alt: "Minh họa robotaxi Waymo Ojai và chip ASIC 5 nm xử lý dữ liệu cảm biến với hiệu năng hơn 1.000 TOPS trong môi trường đô thị."
keywords:
  - "Waymo"
  - "chip ASIC 5 nm"
  - "robotaxi Ojai"
source_url: "https://techcrunch.com/2026/08/23/techcrunch-mobility-the-custom-chip-driving-waymos-robotaxi-ambitions"
source_name: "TechCrunch"
source_date: "2026-08-23T16:03:00+00:00"
automated: true
ai_category: "Trí tuệ nhân tạo"
---

Waymo đang đẩy cuộc đua robotaxi sang một mặt trận ít “ồn ào” hơn lidar hay bản đồ HD: **chip tùy biến**. Theo TechCrunch, công ty vừa chia sẻ rằng họ đã tự xây dựng một **chip silicon tùy biến**, cụ thể là **chip ASIC tiến trình 5 nm**, để xử lý “lượng dữ liệu thô khổng lồ” trước khi dữ liệu đi vào “bộ não” cốt lõi của hệ thống tự lái. Động thái này xuất hiện đúng thời điểm Waymo đang cần những đột phá về chi phí để mở rộng vận hành và cuối cùng là tiến tới lợi nhuận.

Waymo cho biết họ đã **mở robotaxi thế hệ mới Ojai cho tất cả hành khách** tại **Los Angeles, Phoenix và San Francisco**. Công ty cũng nhiều lần nhấn mạnh Ojai là xe thế hệ mới **rẻ hơn để chế tạo, vận hành và bảo trì**—những yếu tố “bắt buộc” nếu Waymo muốn có cơ hội **có lãi trong tương lai**. Trong bối cảnh đó, chip không chỉ là câu chuyện kỹ thuật; nó là câu chuyện **đơn vị kinh tế (unit economics)**.

## 1) Vì sao chip tùy biến lại là “đòn bẩy” của robotaxi?

Robotaxi là bài toán vừa kỹ thuật vừa vận hành: xe phải hiểu môi trường đô thị dày đặc tình huống, đồng thời chi phí phần cứng–điện năng–bảo trì phải đủ thấp để mô hình kinh doanh đứng vững. Waymo mô tả hệ thống mới đạt “**unmatched efficiency and performance**” và xem chip là “**mảnh ghép quan trọng**” để xe **phản ứng nhanh và an toàn** trong môi trường đô thị phức tạp, mật độ cao.

Điểm đáng chú ý là chip này được đặt đúng “điểm nghẽn” của hệ thống: **xử lý dữ liệu thô trước khi vào bộ não**. Với robotaxi, dữ liệu thô không chỉ nhiều mà còn đa dạng và đòi hỏi xử lý thời gian thực. TechCrunch nêu ví dụ: **Waymo Ojai có 13 camera độ trung thực cao**. Chỉ riêng camera đã tạo ra luồng dữ liệu lớn; cộng thêm các cảm biến khác (bài viết tập trung vào camera, không nêu chi tiết từng loại cảm biến còn lại), nhu cầu xử lý tiền tuyến (pre-processing) càng trở nên quan trọng.

Về hiệu năng, Waymo nói chip cung cấp **hơn 1.000 TOPS** và được mô tả là “roughly in the same performance range” với **Nvidia DRIVE AGX Thor** cho ứng dụng lái tự động. Dù TOPS không phải thước đo duy nhất của hiệu quả hệ thống, việc Waymo chủ động đặt chip mình cạnh một nền tảng đầu bảng của Nvidia là thông điệp rõ ràng: họ muốn chứng minh năng lực tính toán **đủ cho quy mô đô thị**, không chỉ chạy demo.

## 2) Tích hợp dọc có chọn lọc: tự làm lõi, dựa vào hệ sinh thái để mở rộng

Một hiểu nhầm phổ biến là “tự làm chip” đồng nghĩa với tự làm tất cả. Trên thực tế, Waymo cũng nói rõ họ **không làm việc một mình** về tính toán và liệt kê các đối tác gồm **AMD, Micron, Nvidia, Samsung, Sandisk, Socionext và TSMC**.

Danh sách này cho thấy một mô hình quen thuộc của ngành công nghệ: **tự chủ phần lõi khác biệt** (custom silicon/kiến trúc xử lý dữ liệu) nhưng vẫn dựa vào chuỗi cung ứng tiêu chuẩn hóa (bộ nhớ, lưu trữ, sản xuất chip, IP thiết kế, đối tác tính toán). Với nhà đầu tư và các doanh nghiệp trong chuỗi cung ứng, đây là tín hiệu quan trọng: robotaxi đang hình thành một “stack” phần cứng–phần mềm riêng, nơi các nhà cung ứng bán dẫn và hệ thống có thể tìm thấy đơn hàng khi quy mô đội xe tăng.

Ở góc nhìn kinh tế, chip tùy biến thường được theo đuổi khi doanh nghiệp tin rằng:

- Khối lượng triển khai đủ lớn để bù chi phí thiết kế.
- Tối ưu hóa điện năng/độ trễ/chi phí BOM (bill of materials) có tác động trực tiếp đến biên lợi nhuận.

TechCrunch không cung cấp chi phí chip hay chi phí hệ thống, nhưng việc Waymo liên tục nhấn mạnh Ojai rẻ hơn để chế tạo và vận hành khiến chip có thể được hiểu như một trong các “đòn bẩy” để giảm tổng chi phí sở hữu (TCO) theo thời gian.

## 3) Không chỉ Waymo: bức tranh cạnh tranh robotaxi và giao hàng tự động đang nóng lên

Bài TechCrunch cũng đặt câu chuyện chip của Waymo trong bối cảnh rộng hơn của tự động hóa vận tải và giao hàng:

- **Nevada** đã cấp giấy phép cho **Tesla, Uber và Waymo** để vận hành **robotaxi thương mại tại Clark County (Las Vegas)**. Tổng cộng, các giấy phép có thể triển khai tới **8.000 robotaxi trong 12 tháng tới**, dù bài viết nhận định khó có đủ 8.000 xe đến Vegas trong một năm.
- Ở mảng giao hàng tự động, **Uber** cho biết đang **đầu tư và hợp tác với Zipline** với mục tiêu **1 triệu chuyến giao hàng/ngày bằng drone vào cuối 2029** (không công bố số tiền). **Amazon** muốn dịch vụ giao hàng bằng drone đạt gần **500 thành phố tại Mỹ vào cuối 2026**, mở rộng gấp sáu lần phạm vi hiện tại.
- Mảng robot vỉa hè cũng đang tái cấu trúc quan hệ đối tác: **Serve Robotics** hợp tác với **Grubhub** để triển khai từ **Chicago, Los Angeles và Alexandria (Virginia)**; đồng thời mở rộng hợp tác **DoorDash** sang **San Jose** và **Washington, D.C.** TechCrunch lưu ý trước đó **Uber đã giảm sử dụng robot của Serve** trên ứng dụng; quan hệ đối tác dự kiến kết thúc năm sau, và Uber đã **bán toàn bộ cổ phần** tại Serve.

Các mảnh ghép này cho thấy xu hướng chung: khi tự động hóa đi từ thí điểm sang vận hành thương mại, “điểm rơi” cạnh tranh không chỉ là thuật toán mà còn là **năng lực triển khai**, **đối tác phân phối**, và **chi phí phần cứng**. Trong bức tranh đó, chip tùy biến của Waymo là một nỗ lực nhằm kiểm soát tốt hơn một trong những cấu phần đắt đỏ nhất của robotaxi: tính toán thời gian thực.

## 4) Rủi ro chính sách/chuỗi cung ứng: câu chuyện lidar Trung Quốc và an ninh

TechCrunch dẫn nguồn tin cho biết **Idaho National Laboratory** đang đánh giá liệu **lidar Trung Quốc** có thể gây **rủi ro an ninh** nếu được dùng rộng rãi trên xe ở Mỹ; nghiên cứu được tài trợ bởi **một công ty hoặc nhóm công ty** trong ngành xe điện và xe tự hành. Phóng viên Sean O’Kane đã liên hệ nhiều công ty (Rivian, GM, Ford, Kodiak, Lucid, Nuro, Uber) và họ nói **không biết** về cuộc rà soát; Aurora, Nvidia và Zoox **không phản hồi**.

Dù chưa có kết luận, đây là tín hiệu để các công ty AV/EV lưu ý: cảm biến và nguồn cung phần cứng có thể trở thành chủ đề chính sách tương tự như chip/viễn thông. Với Waymo, việc đầu tư vào phần “lõi” như chip cũng có thể được nhìn như một cách giảm phụ thuộc vào một số thành phần nhạy cảm trong chuỗi cung ứng—dù bài viết không khẳng định Waymo làm chip vì lý do chính sách.

## Hàm ý thực tiễn cho doanh nghiệp và nhà đầu tư

1) **Theo dõi “custom silicon” như chỉ báo lợi thế chi phí**: Waymo đang đặt cược rằng tối ưu tiền xử lý dữ liệu và hiệu năng tính toán sẽ giúp xe phản ứng nhanh trong đô thị và hỗ trợ mục tiêu giảm chi phí vận hành. Với nhà đầu tư, đây là dấu hiệu Waymo tập trung vào bài toán mở rộng và lợi nhuận, không chỉ năng lực tự lái.

2) **Cơ hội cho hệ sinh thái bán dẫn–ô tô**: Waymo công khai danh sách đối tác (AMD, Micron, Nvidia, Samsung, Sandisk, Socionext, TSMC) cho thấy đội xe robotaxi thế hệ mới kéo theo nhu cầu ở nhiều lớp: bộ nhớ, lưu trữ, gia công sản xuất, nền tảng tính toán bổ trợ.

3) **Chuẩn bị kịch bản rủi ro chính sách cho cảm biến**: nếu đánh giá về lidar Trung Quốc dẫn tới siết quy định, doanh nghiệp cần sẵn sàng phương án thay thế nhà cung cấp và tuân thủ.

4) **Bài học “đa dạng hóa đối tác” trong giao hàng tự động**: diễn biến Serve Robotics (giảm phụ thuộc Uber, mở rộng Grubhub/DoorDash) cho thấy kênh phân phối quyết định sống còn khi các nền tảng thay đổi ưu tiên.

## Hạn chế và những điểm cần kiểm chứng thêm

- Một số tuyên bố như “unmatched efficiency and performance” là **tự công bố từ Waymo** và bài viết không kèm **benchmark độc lập**.
- TechCrunch không đưa **chi phí chip**, **chi phí hệ thống**, hay dữ liệu đủ để định lượng tác động trực tiếp lên **biên lợi nhuận**.
- Thông tin về rà soát lidar của Idaho National Laboratory dựa trên **nguồn tin**, chưa có danh tính bên tài trợ và nhiều công ty nói **không biết** về cuộc rà soát.
- Các phản hồi của Waymo với **NHTSA** trong điều tra vụ robotaxi đâm trẻ em ở tốc độ thấp đã được công bố (ít nhất phần được phát hành) nhưng bị **bôi đen**, hạn chế khả năng đánh giá chi tiết.

## Nguồn tham khảo

- TechCrunch — *TechCrunch Mobility: The custom chip driving Waymo’s robotaxi ambitions* (23/08/2026): https://techcrunch.com/2026/08/23/techcrunch-mobility-the-custom-chip-driving-waymos-robotaxi-ambitions/
