import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitContact } from "@/lib/contactApi";

const slots = [
  "08:30 - 09:30",
  "09:45 - 10:45",
  "13:30 - 14:30",
  "15:00 - 16:00",
  "16:15 - 17:15",
];

const services = [
  "Thương mại & Phân phối",
  "Công nghệ thông tin & Phần mềm",
  "Quảng cáo & Nghiên cứu thị trường",
  "Vận tải - Logistics - Cho thuê xe",
  "Giáo dục & Đào tạo",
];

const Schedule = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0],
    date: "",
    slot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      setErrorMessage("");
      await submitContact({
        type: "schedule",
        payload: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          date: form.date,
          slot: form.slot,
        },
      });
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: services[0],
        date: "",
        slot: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Gửi thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Đặt lịch hẹn | Kiến Hưng Investment"
        description="Đặt lịch tư vấn trực tuyến với Kiến Hưng Investment."
        canonical="https://kienhunginvest.com/dat-lich-hen"
      />
      <Header />
      <main className="bg-secondary/40">
        <div className="container mx-auto px-6 lg:px-12 py-14 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Lịch hẹn online</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Đặt lịch tư vấn chiến lược
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Chọn ngày và khung giờ phù hợp. Chúng tôi sẽ xác nhận lịch hẹn qua email hoặc điện thoại.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-10 rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-elevated space-y-6">
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
                <label className="block font-body text-sm font-medium text-foreground mb-2">Dịch vụ quan tâm</label>
                <Select
                  value={form.service}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, service: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">Ngày hẹn *</label>
                <Input required type="date" value={form.date} onChange={onChange("date")} />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">Khung giờ *</label>
                <Select
                  value={form.slot}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, slot: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khung giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    {slots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Button type="submit" size="lg" disabled={status === "loading"} className="sm:w-auto w-full">
                {status === "loading" ? "Đang gửi..." : "Xác nhận lịch hẹn"}
              </Button>
              <span className="text-sm text-muted-foreground">Chúng tôi sẽ phản hồi trong vòng 24h.</span>
            </div>

            {status === "success" && (
              <div className="text-sm text-green-600 font-medium">
                Yêu cầu đặt lịch đã gửi. Chúng tôi sẽ liên hệ xác nhận.
              </div>
            )}
            {status === "error" && (
              <div className="text-sm text-red-600 font-medium">
                {errorMessage || "Gửi thất bại. Vui lòng thử lại hoặc gọi hotline 0903 103 198."}
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
