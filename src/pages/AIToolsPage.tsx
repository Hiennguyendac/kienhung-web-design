import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { aiClient } from "@/lib/aiClient";
import type { AiMode, ChatMessage, RagCitation } from "@/lib/aiTypes";
import { ModelSelector } from "@/components/ai/ModelSelector";

const isEnabled = (import.meta.env.VITE_AI_ENABLED as string) === "true";

const summarizePrompt =
  "Bạn là trợ lý biên tập. Hãy tóm tắt nội dung dưới đây thành 5 gạch đầu dòng rõ ý, súc tích, tiếng Việt.";
const seoPrompt =
  "Bạn là chuyên gia nội dung SEO. Hãy viết dàn ý bài viết chuẩn SEO (tiêu đề H1, H2, H3) kèm 5 bullet ý chính, tiếng Việt.";

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

  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleChat = async (
    input: string,
    setOutput: (value: string) => void,
    extraMessages: ChatMessage[] = []
  ) => {
    if (!input.trim()) return;
    setLoading("chat");
    setError(null);
    try {
      const response = await aiClient.chat({
        mode,
        model,
        messages: [...extraMessages, { role: "user", content: input.trim() }],
        temperature: 0.7,
      });
      setOutput(response.content || "");
    } catch (err: any) {
      setError(err?.message || "Không thể kết nối AI.");
    } finally {
      setLoading(null);
    }
  };

  const handleRag = async () => {
    if (!ragQuery.trim()) return;
    setLoading("rag");
    setError(null);
    try {
      const response = await aiClient.ragChat({
        mode,
        model,
        messages: [{ role: "user", content: ragQuery.trim() }],
        temperature: 0.7,
      });
      setRagAnswer(response.content || "");
      setRagCitations(response.citations || []);
    } catch (err: any) {
      setError(err?.message || "Không thể kết nối AI.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="AI Tools | Kiến Hưng Investment"
        description="Bộ công cụ AI hỗ trợ tóm tắt nhanh, gợi ý SEO và RAG chat."
        canonical="https://kienhunginvest.com/ai-tools"
      />
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-gold text-sm uppercase tracking-widest mb-2">AI tools</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Bộ công cụ AI</h1>
            <p className="text-muted-foreground mt-2">
              Tăng tốc xử lý nội dung, nghiên cứu và tối ưu SEO với AI Gateway.
            </p>
          </div>
          <ModelSelector models={models} value={model} mode={mode} onModeChange={setMode} onChange={setModel} />
        </div>

        {!isEnabled ? (
          <div className="rounded-2xl border border-border bg-secondary/40 p-8 text-center text-muted-foreground">
            AI disabled
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-foreground">RAG Chat</h2>
                <p className="text-sm text-muted-foreground">
                  Đặt câu hỏi về tài liệu nội bộ, hệ thống sẽ trả lời kèm nguồn tham chiếu.
                </p>
                <textarea
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Nhập câu hỏi..."
                />
                <button
                  type="button"
                  onClick={handleRag}
                  disabled={loading === "rag"}
                  className="rounded-lg bg-navy text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {loading === "rag" ? "Đang xử lý..." : "Gửi RAG"}
                </button>
                {ragAnswer && (
                  <div className="rounded-lg bg-secondary/40 p-3 text-sm text-foreground whitespace-pre-wrap">
                    {ragAnswer}
                  </div>
                )}
                {ragCitations.length > 0 && (
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="font-semibold uppercase">Citations</p>
                    {ragCitations.map((cite, idx) => (
                      <div key={`${cite.url || cite.title}-${idx}`} className="rounded-md border border-border p-2">
                        <p className="font-medium text-foreground">{cite.title || "Nguồn tham chiếu"}</p>
                        {cite.url && (
                          <a className="text-navy underline" href={cite.url} target="_blank" rel="noreferrer">
                            {cite.url}
                          </a>
                        )}
                        {cite.snippet && <p className="mt-1">{cite.snippet}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-foreground">Quick Summarize</h2>
                <p className="text-sm text-muted-foreground">
                  Tóm tắt nhanh nội dung, báo cáo, hoặc tài liệu dài thành gạch đầu dòng.
                </p>
                <textarea
                  value={summarizeInput}
                  onChange={(e) => setSummarizeInput(e.target.value)}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Dán nội dung cần tóm tắt..."
                />
                <button
                  type="button"
                  onClick={() =>
                    handleChat(summarizeInput, setSummarizeOutput, [{ role: "system", content: summarizePrompt }])
                  }
                  disabled={loading === "chat"}
                  className="rounded-lg bg-navy text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {loading === "chat" ? "Đang xử lý..." : "Tóm tắt"}
                </button>
                {summarizeOutput && (
                  <div className="rounded-lg bg-secondary/40 p-3 text-sm text-foreground whitespace-pre-wrap">
                    {summarizeOutput}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-foreground">SEO Draft</h2>
                <p className="text-sm text-muted-foreground">
                  Gợi ý dàn ý bài viết chuẩn SEO và nội dung gợi ý.
                </p>
                <textarea
                  value={seoInput}
                  onChange={(e) => setSeoInput(e.target.value)}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Nhập chủ đề hoặc keyword..."
                />
                <button
                  type="button"
                  onClick={() => handleChat(seoInput, setSeoOutput, [{ role: "system", content: seoPrompt }])}
                  disabled={loading === "chat"}
                  className="rounded-lg bg-navy text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {loading === "chat" ? "Đang xử lý..." : "Tạo dàn ý"}
                </button>
                {seoOutput && (
                  <div className="rounded-lg bg-secondary/40 p-3 text-sm text-foreground whitespace-pre-wrap">
                    {seoOutput}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
