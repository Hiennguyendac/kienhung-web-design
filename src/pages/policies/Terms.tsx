import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-14 lg:py-20 space-y-10">
        <div>
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Chính sách</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Điều khoản sử dụng
          </h1>
          <p className="font-body text-muted-foreground max-w-3xl">
            Điều khoản áp dụng cho việc truy cập và sử dụng các sản phẩm, dịch vụ do Kiến Hưng
            Investment cung cấp. Vui lòng đọc kỹ trước khi sử dụng.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl font-body text-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">1. Phạm vi áp dụng</h2>
            <p>
              Điều khoản này điều chỉnh quyền và nghĩa vụ của khách hàng khi sử dụng website, ứng dụng
              và các dịch vụ liên quan của Kiến Hưng Investment.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">2. Quyền và trách nhiệm</h2>
            <p>
              Người dùng có trách nhiệm cung cấp thông tin chính xác, tuân thủ quy định pháp luật và
              không sử dụng dịch vụ vào mục đích trái phép. Kiến Hưng có quyền cập nhật, tạm ngưng hoặc
              thay đổi dịch vụ để nâng cao chất lượng.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">3. Sở hữu trí tuệ</h2>
            <p>
              Nội dung, thiết kế và nhãn hiệu thuộc quyền sở hữu của Kiến Hưng hoặc đối tác; mọi hành vi
              sao chép, khai thác phải được chấp thuận bằng văn bản.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-heading text-xl font-semibold">4. Giới hạn trách nhiệm</h2>
            <p>
              Kiến Hưng không chịu trách nhiệm đối với thiệt hại gián tiếp, ngoài khả năng kiểm soát hợp
              lý; thông tin cung cấp mang tính tham khảo và có thể thay đổi mà không báo trước.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
