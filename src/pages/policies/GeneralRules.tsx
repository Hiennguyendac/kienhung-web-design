import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const GeneralRulesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-10">
        <div>
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Chính sách</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quy định chung
          </h1>
          <p className="font-body text-muted-foreground max-w-3xl">
            Các quy định chung áp dụng cho khách hàng, đối tác khi sử dụng dịch vụ của Kiến Hưng
            Investment.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl font-body text-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">1. Nguyên tắc chung</h2>
            <p>
              Tuân thủ pháp luật Việt Nam, tôn trọng quyền lợi các bên và thực hiện đầy đủ nghĩa vụ theo
              hợp đồng, thỏa thuận.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">2. Hỗ trợ và liên hệ</h2>
            <p>
              Mọi yêu cầu hỗ trợ, phản hồi hoặc khiếu nại gửi về contact@kienhunginvest.vn hoặc hotline
              0903 103 198 để được giải quyết kịp thời.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">3. Cập nhật quy định</h2>
            <p>
              Kiến Hưng có thể cập nhật quy định để phù hợp thực tế; thông tin thay đổi sẽ được công bố
              trên website. Việc tiếp tục sử dụng dịch vụ đồng nghĩa bạn chấp nhận các cập nhật này.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GeneralRulesPage;
