---
title: "Bayes Factor Explained: Hướng dẫn thực chiến cho người mới bắt đầu"
slug: "bayes-factor"
date: "2026-01-08"
category: "Bayes & Inference"
description: "Hướng dẫn thực chiến về Bayes Factor: định nghĩa, công thức, thang Jeffrey, ảnh hưởng của prior, ưu điểm và hạn chế."
image: "/news/bayes-factor-jeffreys-scale.png"
---
Bayes Factor (BF) là thước đo tỷ lệ bằng chứng giữa hai giả thuyết cạnh tranh. Bài viết này giải thích khái niệm, cách diễn giải theo thang Jeffrey, ảnh hưởng của prior và điểm mạnh/yếu khi ứng dụng trong thực tế.

## Điểm nhấn nhanh
- **So sánh bằng chứng:** Bayes Factor đo tỷ lệ bằng chứng ủng hộ H1 so với H0, trực quan hơn p-value.
- **Cập nhật khi có dữ liệu mới:** Bạn có thể cập nhật BF liên tục khi thêm dữ liệu mà không làm sai kết luận.
- **Dễ diễn giải:** BF cho biết mức độ ủng hộ, không ép quyết định nhị phân.

## 1. Bayes Factor là gì?
Bayes Factor (BF) là tỷ lệ so sánh bằng chứng ủng hộ hai giả thuyết cạnh tranh. Thay vì chỉ trả lời “có ý nghĩa thống kê hay không”, BF cho biết giả thuyết nào được dữ liệu ủng hộ mạnh hơn. Ví dụ: so sánh H1 “thuốc mới hiệu quả hơn thuốc cũ” với H0 “thuốc mới không hiệu quả hơn thuốc cũ”.

## 2. Công thức và ý nghĩa
Bayes Factor BF10 đo mức độ ủng hộ H1 so với H0 dựa trên xác suất dữ liệu xảy ra dưới mỗi giả thuyết. Nếu BF10 > 1, dữ liệu ủng hộ H1 nhiều hơn H0; nếu BF10 < 1 thì ngược lại. BF10 = 1 nghĩa là dữ liệu không cung cấp bằng chứng rõ ràng cho giả thuyết nào.

## 3. Diễn giải theo thang Jeffrey
![Infographic thang Jeffrey cho Bayes Factor](/news/bayes-factor-jeffreys-scale.png)
*Jeffreys’s Scale: BF > 1 ủng hộ H1, BF < 1 ủng hộ H0; mức độ bằng chứng tăng dần theo thang.*

| Bayes Factor (BF10) | Bằng chứng |
| --- | --- |
| > 100 | Cực mạnh ủng hộ H1 |
| 30 - 100 | Rất mạnh ủng hộ H1 |
| 10 - 30 | Mạnh ủng hộ H1 |
| 3 - 10 | Vừa đủ ủng hộ H1 |
| 1 - 3 | Không đáng kể ủng hộ H1 |
| 1 | Không có bằng chứng |
| 1/3 - 1 | Không đáng kể ủng hộ H0 |
| 1/10 - 1/3 | Vừa đủ ủng hộ H0 |
| 1/30 - 1/10 | Mạnh ủng hộ H0 |
| 1/100 - 1/30 | Rất mạnh ủng hộ H0 |
| < 1/100 | Cực mạnh ủng hộ H0 |

![Bảng diễn giải mức bằng chứng của Bayes Factor theo Jeffreys](/news/bayes-factor-table.png)
*Bảng tham chiếu Jeffrey: đối chiếu BF và mức độ bằng chứng ủng hộ H1/H0.*

Ví dụ: BF10 = 5 nghĩa là có bằng chứng vừa đủ ủng hộ H1.

## 4. Lưu ý về prior
Bayes Factor phụ thuộc vào prior (niềm tin ban đầu). Prior hợp lý giúp kết luận ổn định hơn; prior không phù hợp có thể làm BF lệch. Khi có kiến thức nền, dùng informative prior; nếu không, dùng non-informative prior để giảm ảnh hưởng chủ quan.

## 5. Ưu điểm
- Không ép quyết định nhị phân; BF thể hiện mức độ ủng hộ dữ liệu cho mỗi giả thuyết.
- Cho phép cập nhật kết luận khi có thêm dữ liệu.
- Không phụ thuộc stopping rule như một số kiểm định truyền thống.
- Dễ diễn giải hơn p-value trong bối cảnh ra quyết định.

## 6. Hạn chế
> BF nhạy với prior, tính toán có thể phức tạp và tốn thời gian cho mô hình lớn. Chọn prior phù hợp và phương pháp tính hiệu quả là yếu tố then chốt để ứng dụng thực tế.

## Kết luận
Bayes Factor là công cụ mạnh để kiểm định giả thuyết, cung cấp bằng chứng chi tiết hơn so với phương pháp truyền thống. Dù có hạn chế, BF vẫn là lựa chọn tốt khi cần đánh giá mức độ ủng hộ giữa các giả thuyết cạnh tranh.

> Cần trao đổi về Bayes Factor? Gửi email tới [contact@kienhunginvest.vn](mailto:contact@kienhunginvest.vn?subject=Tu%20van%20Bayes%20Factor).
