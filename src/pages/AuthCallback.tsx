import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

type StatusKind = "loading" | "success" | "error";

const parseParams = () => {
  const search = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return {
    error:
      search.get("error") ||
      search.get("error_code") ||
      hash.get("error") ||
      hash.get("error_code"),
    errorDescription:
      search.get("error_description") ||
      hash.get("error_description") ||
      search.get("error_message") ||
      hash.get("error_message"),
  };
};

export default function AuthCallback() {
  const [status, setStatus] = useState<StatusKind>("loading");
  const [message, setMessage] = useState("Đang xác nhận email...");

  const params = useMemo(() => parseParams(), []);

  useEffect(() => {
    if (params.error) {
      setStatus("error");
      setMessage(params.errorDescription || "Liên kết xác nhận không hợp lệ hoặc đã hết hạn.");
      return;
    }

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data.session) {
          setStatus("success");
          setMessage("Xác nhận thành công. Bạn đã đăng nhập.");
        } else {
          setStatus("success");
          setMessage("Xác nhận thành công. Vui lòng đăng nhập để tiếp tục.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Không thể xác nhận email. Vui lòng thử lại.");
      });
  }, [params.error, params.errorDescription]);

  return (
    <>
      <Seo
        title="Xác nhận email | Kiến Hưng Investment"
        description="Hoàn tất xác nhận email để truy cập AI Tools."
      />
      <Header />
      <main className="bg-slate-50">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <h1 className="text-2xl font-semibold text-slate-900">
              {status === "loading" ? "Đang xử lý..." : status === "error" ? "Xác nhận thất bại" : "Xác nhận thành công"}
            </h1>
            <p className="mt-3 text-sm text-slate-600">{message}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/ai-tools"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Vào AI Tools
              </Link>
              <Link
                to="/"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
