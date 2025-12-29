import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBSITE_KNOWLEDGE = `
# THÔNG TIN CÔNG TY KIẾN HƯNG INVESTMENT

## Thông tin pháp lý
- Tên công ty: CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ ĐẦU TƯ KIẾN HƯNG
- Tên giao dịch: KIẾN HƯNG INVESTMENT
- Mã số thuế: 0317197517
- Trụ sở chính: 35/29/11 Cao Lỗ, Phường Chánh Hưng, Thành phố Hồ Chí Minh
- Văn phòng: MP2-3.11 Mizuki Park, Bình Hưng, Thành phố Hồ Chí Minh
- Điện thoại: 0903103198
- Website: kienhunginvest.vn

## Lĩnh vực hoạt động chính

### 1. Thương mại & Phân phối (/services/commerce)
- Mua bán, phân phối hàng hóa đa ngành
- Xuất nhập khẩu
- Cung ứng vật tư, thiết bị
- Làm đại lý và môi giới thương mại

### 2. Công nghệ thông tin & Phần mềm (/services/it)
- Phát triển phần mềm theo yêu cầu
- Giải pháp chuyển đổi số cho doanh nghiệp
- Tư vấn hạ tầng CNTT
- Dịch vụ bảo trì, hỗ trợ kỹ thuật

### 3. Quảng cáo & Nghiên cứu thị trường (/services/marketing)
- Dịch vụ quảng cáo đa nền tảng
- Nghiên cứu thị trường
- Tư vấn thương hiệu
- Digital marketing

### 4. Vận tải – Logistics – Cho thuê xe (/services/logistics)
- Vận chuyển hàng hóa nội địa
- Dịch vụ logistics trọn gói
- Cho thuê xe du lịch, xe công ty
- Quản lý đội xe doanh nghiệp

### 5. Giáo dục & Đào tạo (/services/education)
- Đào tạo kỹ năng mềm
- Khóa học chuyên môn ngắn hạn
- Tư vấn phát triển nguồn nhân lực
- Hợp tác đào tạo doanh nghiệp

## Tầm nhìn
Trở thành tập đoàn đa ngành hàng đầu tại Việt Nam, tạo giá trị bền vững cho khách hàng, đối tác và cộng đồng.

## Sứ mệnh
Cung cấp giải pháp toàn diện, chất lượng cao trong các lĩnh vực thương mại, công nghệ, logistics và đào tạo.

## Giá trị cốt lõi
- Uy tín: Cam kết thực hiện đúng lời hứa
- Chất lượng: Nỗ lực hoàn thiện trong từng dịch vụ
- Sáng tạo: Luôn tìm kiếm giải pháp mới
- Hợp tác: Xây dựng quan hệ đối tác bền vững

## Các trang trên website
- Trang chủ: / - Tổng quan về công ty
- Giới thiệu: /about - Thông tin chi tiết về công ty, lịch sử, đội ngũ
- Dịch vụ: /services - Danh sách các lĩnh vực hoạt động
- Tin tức: /news - Tin tức và bài viết mới nhất
- Liên hệ: /contact - Form liên hệ và thông tin liên lạc
- Gửi yêu cầu: /request-form - Form gửi yêu cầu báo giá/tư vấn

## Hướng dẫn trả lời
- Luôn trả lời bằng tiếng Việt, lịch sự và chuyên nghiệp
- Khi khách hỏi về dịch vụ, giới thiệu ngắn gọn và đề xuất trang liên quan
- Khi khách cần liên hệ, cung cấp số điện thoại 0903103198 hoặc hướng dẫn đến trang /contact
- Khi khách muốn báo giá/tư vấn, hướng dẫn đến trang /request-form
- Đề xuất các trang phù hợp để khách tự tìm hiểu thêm
`;

const systemPrompt = `Bạn là trợ lý AI chính thức của KIẾN HƯNG INVESTMENT.

## CÁCH TRẢ LỜI:
- TRẢ LỜI TRỰC TIẾP với thông tin đầy đủ, chi tiết từ dữ liệu bên dưới
- KHÔNG yêu cầu khách truy cập trang web để tìm thông tin - hãy cung cấp ngay
- Chỉ đề xuất trang web ở cuối như "Tìm hiểu thêm tại..." nếu khách muốn xem chi tiết hơn
- Trả lời thân thiện, chuyên nghiệp, đầy đủ nội dung

## VÍ DỤ:
❌ Sai: "Bạn có thể xem thông tin dịch vụ CNTT tại /services/it"
✅ Đúng: "Kiến Hưng cung cấp dịch vụ CNTT bao gồm: phát triển phần mềm theo yêu cầu, giải pháp chuyển đổi số, tư vấn hạ tầng CNTT, và dịch vụ bảo trì hỗ trợ kỹ thuật. Tìm hiểu thêm tại /services/it"

${WEBSITE_KNOWLEDGE}`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  if (!LOVABLE_API_KEY) {
    console.error("Missing LOVABLE_API_KEY");
    return new Response(JSON.stringify({ error: "AI chưa được cấu hình" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Filter out any existing system prompts and add our own
    const userMessages = messages.filter((m: any) => m.role !== "system");

    console.log("Calling Lovable AI with", userMessages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...userMessages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Hệ thống đang bận, vui lòng thử lại sau." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Dịch vụ AI tạm ngưng, vui lòng liên hệ quản trị viên." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Lỗi kết nối AI" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    console.log("AI response received, length:", content.length);

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    console.error("openai-chat error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
