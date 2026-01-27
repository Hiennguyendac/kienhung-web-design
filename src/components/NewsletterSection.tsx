import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitContact } from "@/lib/contactApi";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      setErrorMessage("");
      await submitContact({
        type: "newsletter",
        payload: { email: email.trim() },
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Gửi thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="rounded-3xl border border-border bg-card p-8 lg:p-12 shadow-elevated">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Lead magnet</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nhận bộ tài liệu chiến lược đầu tư & vận hành
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Tài liệu tóm tắt xu hướng thị trường, khung triển khai và bộ checklist giúp ra quyết định nhanh hơn.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border border-border px-4 py-1 bg-background">PDF 12 trang</span>
                <span className="rounded-full border border-border px-4 py-1 bg-background">Cập nhật 2026</span>
                <span className="rounded-full border border-border px-4 py-1 bg-background">Tải miễn phí</span>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email để nhận tài liệu"
                  required
                />
                <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Đang gửi..." : "Nhận tài liệu & bản tin"}
                </Button>
              </form>
              <a
                href="/lead-magnet.pdf"
                className="mt-4 inline-flex text-sm text-navy underline hover:text-navy/80"
              >
                Xem trước tài liệu mẫu
              </a>
              {status === "success" && (
                <p className="text-sm text-green-600 mt-3">Đã đăng ký thành công. Kiểm tra email của bạn.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 mt-3">{errorMessage}</p>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                Bằng cách đăng ký, bạn đồng ý nhận email chuyên đề từ Kiến Hưng Investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
