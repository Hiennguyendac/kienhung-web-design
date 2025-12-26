import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RequestForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "Thương mại & Phân phối",
    detail: "",
  });

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formsEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!formsEndpoint) {
      // Fallback: open mail client nếu chưa cấu hình endpoint
      const subject = `Yêu cầu tư vấn từ ${form.name || "khách hàng"}`;
      const body = [
        `Họ tên: ${form.name}`,
        `Điện thoại: ${form.phone}`,
        `Email: ${form.email}`,
        `Công ty: ${form.company}`,
        `Dịch vụ quan tâm: ${form.service}`,
        `Nhu cầu chi tiết: ${form.detail}`,
      ].join("%0D%0A");
      window.location.href = `mailto:nguyen.dac.hien@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch(formsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company,
          service: form.service,
          detail: form.detail,
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        company: "",
        service: "Thương mại & Phân phối",
        detail: "",
      });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="bg-secondary/40">
        <div className="container mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">Liên hệ</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Gửi yêu cầu tư vấn / nhận báo giá
          </h1>
          <p className="font-body text-muted-foreground mb-10 max-w-2xl">
            Điền thông tin dưới đây, chúng tôi sẽ phản hồi trong 24 giờ. Thông tin sẽ được gửi về email nguyen.dac.hien@gmail.com.
          </p>

            <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl shadow-elevated p-6 lg:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Họ và tên *</label>
                  <Input required value={form.name} onChange={onChange("name")} placeholder="Nguyễn Văn A" />
                </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">Số điện thoại *</label>
                <Input required type="tel" value={form.phone} onChange={onChange("phone")} placeholder="0123 456 789" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">Email *</label>
                <Input required type="email" value={form.email} onChange={onChange("email")} placeholder="email@company.com" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">Công ty/Tổ chức</label>
                <Input value={form.company} onChange={onChange("company")} placeholder="Tên công ty (nếu có)" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-body text-sm font-medium text-foreground mb-2">Dịch vụ quan tâm</label>
                <Select
                  value={form.service}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, service: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Thương mại & Phân phối">Thương mại & Phân phối</SelectItem>
                    <SelectItem value="Công nghệ thông tin & Phần mềm">Công nghệ thông tin & Phần mềm</SelectItem>
                    <SelectItem value="Quảng cáo & Nghiên cứu thị trường">Quảng cáo & Nghiên cứu thị trường</SelectItem>
                    <SelectItem value="Vận tải - Logistics - Cho thuê xe">Vận tải - Logistics - Cho thuê xe</SelectItem>
                    <SelectItem value="Giáo dục & Đào tạo">Giáo dục & Đào tạo</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-body text-sm font-medium text-foreground mb-2">Nhu cầu chi tiết *</label>
                <Textarea
                  required
                  rows={5}
                  value={form.detail}
                  onChange={onChange("detail")}
                  placeholder="Mô tả nhu cầu, thời gian triển khai, ngân sách dự kiến..."
                  className="resize-none"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Button type="submit" variant="default" size="lg" className="sm:w-auto w-full" disabled={status === "loading"}>
                {status === "loading" ? "Đang gửi..." : "Gửi yêu cầu"}
              </Button>
              <span className="text-sm text-muted-foreground">Chúng tôi sẽ phản hồi trong 24h qua email/điện thoại.</span>
            </div>
            {status === "success" && (
              <div className="text-sm text-green-600 font-medium">
                Đã gửi yêu cầu. Chúng tôi sẽ liên hệ sớm nhất qua email/điện thoại bạn cung cấp.
              </div>
            )}
            {status === "error" && (
              <div className="text-sm text-red-600 font-medium">
                Gửi thất bại. Vui lòng thử lại hoặc gửi email tới nguyen.dac.hien@gmail.com.
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestForm;
