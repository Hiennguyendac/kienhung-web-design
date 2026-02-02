import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

export default function ProUpgradePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setStatus(null);
      return;
    }
    supabase
      .from("pro_upgrade_requests")
      .select("status")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.status) setStatus(data.status);
      })
      .catch(() => {});
  }, [session]);

  const handleSubmit = async () => {
    if (!session) {
      setError("Bạn cần đăng nhập để gửi yêu cầu nâng cấp.");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("pro-upgrade", {
        body: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          note: note.trim(),
          amount: 100000,
        },
      });
      if (fnError) {
        throw new Error(fnError.message || "Không thể gửi yêu cầu nâng cấp.");
      }
      if (data?.status) setStatus(data.status);
      setMessage("Đã gửi yêu cầu. Vui lòng chờ admin duyệt và kích hoạt Pro.");
    } catch (err: any) {
      setError(err?.message || "Không thể gửi yêu cầu nâng cấp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Nâng cấp Pro | Kiến Hưng Investment"
        description="Đăng ký gói Pro cho AI Tools với quy trình thanh toán và duyệt nhanh chóng."
        canonical="https://kienhunginvest.com/ai-tools/pro"
      />
      <Header />
      <main className="pro-upgrade-page">
        <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="pro-upgrade-hero">
            <div>
              <p className="pro-upgrade-kicker">GÓI PRO</p>
              <h1>Nâng cấp AI Tools lên Pro</h1>
              <p>
                Gói Pro mở rộng quota và ưu tiên xử lý. Sau khi thanh toán, admin sẽ duyệt và kích hoạt trong thời gian
                sớm nhất.
              </p>
            </div>
            <div className="pro-upgrade-price">
              <div className="pro-price-card">
                <p>100.000 VNĐ</p>
                <span>/ tháng</span>
                <ul>
                  <li>200.000 tokens / tháng</li>
                  <li>Ưu tiên xử lý yêu cầu</li>
                  <li>Hỗ trợ nhanh qua email</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pro-upgrade-grid">
            <section className="pro-upgrade-card">
              <h2>Thông tin thanh toán</h2>
              <p>Vui lòng chuyển khoản đúng nội dung để đối soát nhanh.</p>
              <div className="pro-bank-card pro-bank-card--with-qr">
                <div>
                  <p className="label">Tài khoản thụ hưởng</p>
                  <p className="value">Công ty TNHH TM DV Đầu tư Kiến Hưng</p>
                </div>
                <div>
                  <p className="label">Ngân hàng</p>
                  <p className="value">Vietin Bank</p>
                </div>
                <div>
                  <p className="label">Số tài khoản</p>
                  <p className="value">114002909099</p>
                </div>
                <div>
                  <p className="label">Nội dung</p>
                  <p className="value">PRO + email đăng nhập</p>
                </div>
                <div className="pro-bank-qr">
                  <img src="/qr-vietinbank.jpg" alt="QR thanh toán Vietin Bank" loading="lazy" />
                  <p>Quét QR để chuyển khoản nhanh</p>
                </div>
              </div>
              <div className="pro-upgrade-steps">
                <div>
                  <span>1</span>
                  <p>Chuyển khoản gói Pro.</p>
                </div>
                <div>
                  <span>2</span>
                  <p>Điền form xác nhận.</p>
                </div>
                <div>
                  <span>3</span>
                  <p>Admin duyệt và kích hoạt.</p>
                </div>
              </div>
            </section>

            <section className="pro-upgrade-card">
              <h2>Gửi yêu cầu nâng cấp</h2>
              <p>Điền thông tin để xác nhận giao dịch và gửi đến admin.</p>

              {!session && (
                <div className="pro-upgrade-alert">
                  Bạn cần đăng nhập trước. <Link to="/ai-tools">Đăng nhập tại AI Tools</Link>.
                </div>
              )}

              {status === "pending" && (
                <div className="pro-upgrade-alert pro-upgrade-alert--info">
                  Bạn đã có yêu cầu đang chờ duyệt. Chúng tôi sẽ phản hồi sớm nhất.
                </div>
              )}

              {message && <div className="pro-upgrade-alert pro-upgrade-alert--success">{message}</div>}
              {error && <div className="pro-upgrade-alert pro-upgrade-alert--error">{error}</div>}

              <div className="pro-upgrade-form">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Họ tên"
                />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" />
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  placeholder="Mã giao dịch / ghi chú chuyển khoản"
                />
                <button type="button" onClick={handleSubmit} disabled={loading || !session}>
                  {loading ? "Đang gửi..." : "Gửi yêu cầu"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
