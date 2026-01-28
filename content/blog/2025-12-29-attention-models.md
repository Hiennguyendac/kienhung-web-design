---
title: "Attention Models: Mô hình Attention trong Deep Learning"
slug: "attention-models"
date: "2025-12-29"
category: "Deep Learning"
description: "Giải thích trực quan self-attention, Q-K-V, heatmap và multi-head attention; cách mô hình gán trọng số để hiểu ngữ cảnh sâu hơn."
image: "/news/attention-architecture.svg"
---
Attention giúp mô hình tự chọn thông tin quan trọng, thay vì coi mọi phần của dữ liệu đều ngang nhau. Bài viết tóm lược cách attention hoạt động, ví dụ Q–K–V đời thường, self-attention và multi-head attention.

## Điểm chính
- **Gán trọng số thông minh:** Attention giúp mô hình tự biết từ/ngữ cảnh nào quan trọng hơn.
- **Tiết kiệm & chính xác hơn:** Tập trung vào tín hiệu mạnh, giảm nhiễu, tăng chất lượng mô hình.
- **Trực quan hóa được:** Heatmap/bản đồ attention cho thấy mô hình “nhìn” vào đâu.

## 1. Ví dụ trực quan: không phải từ nào cũng quan trọng
Với câu “The cat sat on the mat”, khi tập trung vào “cat”, mô hình sẽ gán trọng số cao cho “cat” và “mat”, thấp cho “the”, “on”. Đây là cơ chế attention: tự động phân bổ mức chú ý cho từng token.

![Các head attention với sắc độ khác nhau trên hội thoại](/news/attention-conversation.svg)
*Mỗi head (màu) tập trung vào phần khác nhau của hội thoại; độ dày thanh màu = trọng số mạnh/yếu.*

## 2. Q – K – V qua ví dụ “tìm người trong đám đông”
Query (Q) = “tìm bạn Bảo đội nón đỏ”; Key (K) = mô tả từng người; Value (V) = thông tin cần lấy. Mô hình so sánh Q với từng K để tìm ai có “nón đỏ” và chỉ tập trung vào Value tương ứng.

![Sơ đồ luồng Q-K-V, tính điểm, softmax và tạo vector ngữ cảnh](/news/attention-architecture.svg)
*Q-K-V được chiếu từ hidden state → tính điểm tương đồng → softmax → nhân với V để tạo context vector.*

## 3. Bản đồ Attention: mô hình đang nhìn vào đâu?
Heatmap thể hiện mức chú ý: ô sáng = tập trung cao, ô tối = bỏ qua. Trong câu dài, mỗi từ có pattern chú ý riêng; từ quan trọng thu hút nhiều attention head.

![Các đường nối thể hiện attention của token "it" tới phần còn lại câu](/news/attention-links.svg)
*Độ đậm/độ dày đường nối cho biết token “it” chú ý mạnh nhất đến những token nào trong chuỗi.*

## 4. Self-Attention: mỗi từ nhìn toàn bộ các từ khác
Mỗi token “đeo kính viễn vọng” nhìn toàn bộ chuỗi, tự quyết định ai quan trọng. Không cần đọc tuần tự như RNN, giúp tốc độ nhanh và hiểu ngữ cảnh sâu hơn.

## 5. Multi-Head Attention: nhiều góc nhìn song song
Hình dung xem phim với nhiều góc nhìn: head1 nhìn ánh sáng, head2 nhìn biểu cảm, head3 nhìn chuyển động, head4 nhìn phông cảnh. Ghép các “góc nhìn” để hiểu sâu hơn.

![Heatmap attention biểu diễn nhiều head trên câu the cat chased the mouse](/news/attention-heatmap.svg)
*Heatmap nhiều head: ô sáng hơn = trọng số cao hơn, cho phép mô hình học nhiều góc nhìn ngữ cảnh cùng lúc.*

> Cần tư vấn giải pháp AI? Gửi email tới [contact@kienhunginvest.com](mailto:contact@kienhunginvest.com?subject=Tu%20van%20AI%20Attention%20Models).
