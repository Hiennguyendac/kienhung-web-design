import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-10">
        <div>
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Chính sách</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Chính sách bảo mật
          </h1>
          <p className="font-body text-muted-foreground max-w-3xl">
            Chúng tôi cam kết bảo vệ dữ liệu cá nhân của khách hàng và đối tác theo quy định pháp luật
            hiện hành.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl font-body text-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">1. Thu thập và sử dụng dữ liệu</h2>
            <p>
              Thông tin được thu thập để phục vụ cung cấp dịch vụ, chăm sóc khách hàng và cải thiện trải
              nghiệm. Chỉ sử dụng cho mục đích đã nêu và có sự đồng ý của bạn.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">2. Lưu trữ và bảo vệ</h2>
            <p>
              Dữ liệu được lưu trữ trên hạ tầng bảo mật, áp dụng kiểm soát truy cập, mã hóa (nếu có) và
              chỉ cấp quyền cho nhân sự liên quan.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">3. Chia sẻ thông tin</h2>
            <p>
              Chỉ chia sẻ với đối tác cung cấp dịch vụ theo hợp đồng, tuân thủ pháp luật hoặc theo yêu
              cầu cơ quan chức năng. Không bán hoặc trao đổi dữ liệu cá nhân.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">4. Quyền của bạn</h2>
            <p>
              Bạn có quyền yêu cầu chỉnh sửa, cập nhật hoặc xóa dữ liệu cá nhân. Liên hệ
              contact@kienhunginvest.com để được hỗ trợ.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
