import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { aiClient } from "@/lib/aiClient";
import type { AiMode, ChatMessage, RagCitation } from "@/lib/aiTypes";
import { ModelSelector } from "@/components/ai/ModelSelector";
import { supabase } from "@/integrations/supabase/client";

const isEnabled = (import.meta.env.VITE_AI_ENABLED as string) === "true";
const FREE_LIMIT = 20000;
const PRO_LIMIT = 200000;

const summarizePrompt =
  "Bạn là trợ lý biên tập. Hãy tóm tắt nội dung dưới đây thành 5 gạch đầu dòng rõ ý, súc tích, tiếng Việt.";
const seoPrompt =
  "Bạn là chuyên gia nội dung SEO. Hãy viết dàn ý bài viết chuẩn SEO (tiêu đề H1, H2, H3) kèm 5 bullet ý chính, tiếng Việt.";

const getPeriodKey = () => new Date().toISOString().slice(0, 7);
const estimateTokens = (text: string) => Math.ceil(text.trim().length / 4);
const estimateMessagesTokens = (messages: ChatMessage[]) =>
  messages.reduce((sum, msg) => sum + estimateTokens(msg.content), 0);

type UsageRecord = {
  id: string;
  user_id: string;
  period: string;
  tokens_used: number;
  tokens_limit: number;
  plan: string;
};

export default function AIToolsPage() {
  const [mode, setMode] = useState<AiMode>("remote");
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState("default");

  const [ragQuery, setRagQuery] = useState("");
  const [ragAnswer, setRagAnswer] = useState("");
  const [ragCitations, setRagCitations] = useState<RagCitation[]>([]);

  const [summarizeInput, setSummarizeInput] = useState("");
  const [summarizeOutput, setSummarizeOutput] = useState("");

  const [seoInput, setSeoInput] = useState("");
  const [seoOutput, setSeoOutput] = useState("");

  const [imagePrompt, setImagePrompt] = useState("");
  const [imageSize, setImageSize] = useState("1024x1024");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [session, setSession] = useState<Session | null>(null);
  const [usage, setUsage] = useState<UsageRecord | null>(null);
  const [usageLoading, setUsageLoading] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const periodKey = useMemo(() => getPeriodKey(), []);
  const authToken = session?.access_token ?? null;
  const usagePercent = usage
    ? Math.min(100, Math.round((usage.tokens_used / usage.tokens_limit) * 100))
    : 0;

  const isQuotaExceeded = usage ? usage.tokens_used >= usage.tokens_limit : false;
  const toolsLocked = !isEnabled || !session || !usage || isQuotaExceeded;

  useEffect(() => {
    if (!isEnabled) return;
    aiClient
      .getModels()
      .then((data) => {
        if (Array.isArray(data.models) && data.models.length > 0) {
          setModels(data.models);
          setModel((prev) => (data.models.includes(prev) ? prev : data.models[0]));
        }
      })
      .catch(() => setModels([]));
  }, []);

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
    if (!session) return;
    setSignInEmail("");
    setSignInPassword("");
    setSignUpEmail("");
    setSignUpPassword("");
  }, [session]);

  useEffect(() => {
    if (!session) {
      setUsage(null);
      return;
    }

    const loadUsage = async () => {
      setUsageLoading(true);
      const planFromMeta = session.user.user_metadata?.plan === "pro" ? "pro" : "free";
      const tokensLimit = planFromMeta === "pro" ? PRO_LIMIT : FREE_LIMIT;

      const { data, error: usageError } = await supabase
        .from("ai_usage")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("period", periodKey)
        .single();

      if (usageError && usageError.code !== "PGRST116") {
        setUsageLoading(false);
        return;
      }

      if (!data) {
        const { data: inserted } = await supabase
          .from("ai_usage")
          .insert({
            user_id: session.user.id,
            period: periodKey,
            tokens_limit: tokensLimit,
            plan: planFromMeta,
          })
          .select("*")
          .single();
        if (inserted) {
          setUsage(inserted as UsageRecord);
        }
      } else {
        setUsage(data as UsageRecord);
      }

      setUsageLoading(false);
    };

    loadUsage();
  }, [periodKey, session]);

  const applyUsage = async (tokenDelta: number) => {
    if (!usage || !session) return;
    const nextTokens = usage.tokens_used + tokenDelta;
    setUsage({ ...usage, tokens_used: nextTokens });
    await supabase.from("ai_usage").update({ tokens_used: nextTokens }).eq("id", usage.id);
  };

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    setAuthMessage(null);
    setAuthLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: signInEmail.trim(),
      password: signInPassword,
    });
    if (signInError) {
      setAuthError(signInError.message);
    } else {
      setSignInEmail("");
      setSignInPassword("");
      setAuthMessage(null);
    }
    setAuthLoading(false);
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    setAuthMessage(null);
    setAuthLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: signUpEmail.trim(),
      password: signUpPassword,
      options: {
        data: { plan: "free" },
      },
    });
    if (signUpError) {
      setAuthError(signUpError.message);
    } else {
      setAuthMessage("Đã tạo tài khoản. Vui lòng kiểm tra email để xác nhận.");
      setSignUpPassword("");
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSignInEmail("");
    setSignInPassword("");
    setSignUpEmail("");
    setSignUpPassword("");
    setAuthMessage(null);
    setAuthError(null);
  };

  const handleChat = async (
    input: string,
    setOutput: (value: string) => void,
    extraMessages: ChatMessage[] = []
  ) => {
    if (!input.trim()) return;
    if (toolsLocked) {
      setError("Bạn cần đăng nhập và còn quota để sử dụng AI Tools.");
      return;
    }
    setLoading("chat");
    setError(null);
    try {
      const messages = [...extraMessages, { role: "user", content: input.trim() }];
      const response = await aiClient.chat(
        {
          mode,
          model,
          messages,
          temperature: 0.7,
        },
        authToken
      );
      setOutput(response.content || "");
      const tokenDelta = estimateMessagesTokens(messages) + estimateTokens(response.content || "");
      await applyUsage(tokenDelta);
    } catch (err: any) {
      setError(err?.message || "Không thể kết nối AI.");
    } finally {
      setLoading(null);
    }
  };

  const handleRag = async () => {
    if (!ragQuery.trim()) return;
    if (toolsLocked) {
      setError("Bạn cần đăng nhập và còn quota để sử dụng AI Tools.");
      return;
    }
    setLoading("rag");
    setError(null);
    try {
      const messages = [{ role: "user", content: ragQuery.trim() }];
      const response = await aiClient.ragChat(
        {
          mode,
          model,
          messages,
          temperature: 0.7,
        },
        authToken
      );
      setRagAnswer(response.content || "");
      setRagCitations(response.citations || []);
      const tokenDelta = estimateMessagesTokens(messages) + estimateTokens(response.content || "");
      await applyUsage(tokenDelta);
    } catch (err: any) {
      setError(err?.message || "Không thể kết nối AI.");
    } finally {
      setLoading(null);
    }
  };

  const handleImage = async () => {
    if (!imagePrompt.trim()) return;
    if (toolsLocked) {
      setError("Bạn cần đăng nhập và còn quota để sử dụng AI Tools.");
      return;
    }
    setLoading("image");
    setError(null);
    setImageUrl("");
    try {
      const response = await aiClient.image(
        {
          mode,
          model,
          prompt: imagePrompt.trim(),
          size: imageSize,
        },
        authToken
      );
      setImageUrl(response.url || "");
      const baseCost = imageSize === "1024x1024" ? 2400 : 1200;
      const tokenDelta = baseCost + estimateTokens(imagePrompt);
      await applyUsage(tokenDelta);
    } catch (err: any) {
      setError(err?.message || "Không thể tạo ảnh.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="AI Tools Studio | Kiến Hưng Investment"
        description="AI Tools Studio: tóm tắt, SEO draft, RAG chat và tạo ảnh qua AI Gateway."
        canonical="https://kienhunginvest.com/ai-tools"
      />
      <Header />
      <main className="bg-slate-950 text-slate-100">
        <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">AI Studio</p>
                <nav className="space-y-2 text-sm">
                  {[
                    { label: "Tổng quan", href: "#overview" },
                    { label: "Tạo ảnh", href: "#image" },
                    { label: "RAG Chat", href: "#rag" },
                    { label: "Tóm tắt nhanh", href: "#summarize" },
                    { label: "SEO Draft", href: "#seo" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-slate-200 hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                      <span className="text-xs text-slate-500">→</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Tài khoản</p>
                {session ? (
                  <div className="space-y-3 text-sm">
                    <p className="text-slate-200 break-all">{session.user.email}</p>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full rounded-lg border border-white/20 px-3 py-2 text-xs uppercase tracking-widest text-slate-200 hover:bg-white/10"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Vui lòng đăng nhập để sử dụng AI Tools.</p>
                )}
              </div>
            </aside>

            <section className="flex-1 space-y-8">
              <div
                id="overview"
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-800/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">AI tools studio</p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                      Trung tâm trải nghiệm AI cho Kiến Hưng
                    </h1>
                    <p className="text-slate-300 mt-3 max-w-xl">
                      Tạo nội dung, phân tích dữ liệu và sinh ảnh minh họa với bộ công cụ AI thực chiến. Yêu cầu đăng
                      nhập để đảm bảo quota và quyền sử dụng.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <ModelSelector
                      models={models}
                      value={model}
                      mode={mode}
                      onModeChange={setMode}
                      onChange={setModel}
                      disabled={!session || !isEnabled}
                    />
                    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
                        <span>Usage</span>
                        <span>{usage ? usage.plan.toUpperCase() : "FREE"}</span>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 rounded-full bg-gold" style={{ width: `${usagePercent}%` }} />
                        </div>
                        <p className="mt-2 text-xs text-slate-300">
                          {usageLoading
                            ? "Đang tải quota..."
                            : usage
                              ? `${usage.tokens_used.toLocaleString()} / ${usage.tokens_limit.toLocaleString()} tokens`
                              : "Đăng nhập để xem quota"}
                        </p>
                      </div>
                      <a
                        href="mailto:contact@kienhunginvest.vn?subject=AI%20Tools%20Upgrade"
                        className="mt-3 inline-flex text-xs uppercase tracking-widest text-gold hover:text-yellow-300"
                      >
                        Nâng cấp Pro
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {!isEnabled && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-center text-slate-300">
                  AI disabled
                </div>
              )}

              {authMessage && (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {authMessage}
                </div>
              )}

              {authError && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {authError}
                </div>
              )}

              {!session && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <form
                    onSubmit={handleSignIn}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 space-y-4"
                  >
                    <h2 className="text-lg font-semibold text-white">Đăng nhập</h2>
                    <input
                      type="email"
                      placeholder="Email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    />
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      autoComplete="current-password"
                      className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    />
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
                    >
                      {authLoading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                  </form>

                  <form
                    onSubmit={handleSignUp}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 space-y-4"
                  >
                    <h2 className="text-lg font-semibold text-white">Tạo tài khoản Free</h2>
                    <input
                      type="email"
                      placeholder="Email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    />
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    />
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full rounded-lg border border-gold/40 px-4 py-2 text-sm font-semibold text-gold disabled:opacity-60"
                    >
                      {authLoading ? "Đang xử lý..." : "Tạo tài khoản"}
                    </button>
                    <p className="text-xs text-slate-400">
                      Miễn phí {FREE_LIMIT.toLocaleString()} tokens/tháng. Nâng cấp để mở rộng.
                    </p>
                  </form>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {isQuotaExceeded && (
                <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  Bạn đã dùng hết quota tháng này. Vui lòng nâng cấp gói để tiếp tục.
                </div>
              )}

              <div className="grid xl:grid-cols-2 gap-6">
                <div
                  id="image"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Image Studio</h2>
                    <span className="text-xs uppercase tracking-widest text-slate-400">Beta</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">
                    Tạo ảnh minh họa nhanh cho bài viết, chiến dịch hoặc dashboard. Kết quả trả về URL ảnh.
                  </p>
                  <textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    placeholder="Ví dụ: Một trung tâm dữ liệu hiện đại, phong cách tương lai, ánh sáng xanh."
                    disabled={toolsLocked}
                  />
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <select
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value)}
                      disabled={toolsLocked}
                      className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-100"
                    >
                      <option value="512x512">512x512</option>
                      <option value="1024x1024">1024x1024</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleImage}
                      disabled={loading === "image" || toolsLocked}
                      className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
                    >
                      {loading === "image" ? "Đang tạo ảnh..." : "Tạo ảnh"}
                    </button>
                  </div>
                  {imageUrl && (
                    <div className="mt-5 space-y-3">
                      <img
                        src={imageUrl}
                        alt="AI generated"
                        className="w-full rounded-2xl border border-white/10 object-cover"
                      />
                      <input
                        value={imageUrl}
                        readOnly
                        className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-200"
                      />
                    </div>
                  )}
                </div>

                <div
                  id="rag"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <h2 className="text-lg font-semibold text-white mb-3">RAG Chat</h2>
                  <p className="text-sm text-slate-300 mb-4">Hỏi đáp tài liệu nội bộ, trả lời kèm nguồn tham chiếu.</p>
                  <textarea
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    placeholder="Nhập câu hỏi..."
                    disabled={toolsLocked}
                  />
                  <button
                    type="button"
                    onClick={handleRag}
                    disabled={loading === "rag" || toolsLocked}
                    className="mt-4 rounded-lg border border-gold/60 px-4 py-2 text-sm font-semibold text-gold disabled:opacity-60"
                  >
                    {loading === "rag" ? "Đang xử lý..." : "Gửi RAG"}
                  </button>
                  {ragAnswer && (
                    <div className="mt-4 rounded-lg bg-slate-950/70 p-3 text-sm text-slate-100 whitespace-pre-wrap">
                      {ragAnswer}
                    </div>
                  )}
                  {ragCitations.length > 0 && (
                    <div className="mt-4 space-y-2 text-xs text-slate-300">
                      <p className="font-semibold uppercase text-slate-400">Citations</p>
                      {ragCitations.map((cite, idx) => (
                        <div key={`${cite.url || cite.title}-${idx}`} className="rounded-md border border-white/10 p-2">
                          <p className="font-medium text-white">{cite.title || "Nguồn tham chiếu"}</p>
                          {cite.url && (
                            <a className="text-gold underline" href={cite.url} target="_blank" rel="noreferrer">
                              {cite.url}
                            </a>
                          )}
                          {cite.snippet && <p className="mt-1">{cite.snippet}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid xl:grid-cols-2 gap-6">
                <div
                  id="summarize"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <h2 className="text-lg font-semibold text-white mb-3">Quick Summarize</h2>
                  <p className="text-sm text-slate-300 mb-4">Tóm tắt nội dung dài thành gạch đầu dòng ngắn gọn.</p>
                  <textarea
                    value={summarizeInput}
                    onChange={(e) => setSummarizeInput(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    placeholder="Dán nội dung cần tóm tắt..."
                    disabled={toolsLocked}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleChat(summarizeInput, setSummarizeOutput, [{ role: "system", content: summarizePrompt }])
                    }
                    disabled={loading === "chat" || toolsLocked}
                    className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {loading === "chat" ? "Đang xử lý..." : "Tóm tắt"}
                  </button>
                  {summarizeOutput && (
                    <div className="mt-4 rounded-lg bg-slate-950/70 p-3 text-sm text-slate-100 whitespace-pre-wrap">
                      {summarizeOutput}
                    </div>
                  )}
                </div>

                <div
                  id="seo"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <h2 className="text-lg font-semibold text-white mb-3">SEO Draft</h2>
                  <p className="text-sm text-slate-300 mb-4">Gợi ý dàn ý chuẩn SEO và các ý chính nổi bật.</p>
                  <textarea
                    value={seoInput}
                    onChange={(e) => setSeoInput(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                    placeholder="Nhập chủ đề hoặc keyword..."
                    disabled={toolsLocked}
                  />
                  <button
                    type="button"
                    onClick={() => handleChat(seoInput, setSeoOutput, [{ role: "system", content: seoPrompt }])}
                    disabled={loading === "chat" || toolsLocked}
                    className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {loading === "chat" ? "Đang xử lý..." : "Tạo dàn ý"}
                  </button>
                  {seoOutput && (
                    <div className="mt-4 rounded-lg bg-slate-950/70 p-3 text-sm text-slate-100 whitespace-pre-wrap">
                      {seoOutput}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
