import { useEffect, useMemo, useRef, useState } from "react";
import { Send, X, Loader2 } from "lucide-react";
import { aiClient } from "@/lib/aiClient";
import type { AiMode, ChatMessage } from "@/lib/aiTypes";
import { ModelSelector } from "./ModelSelector";

type AIChatPanelProps = {
  open: boolean;
  onClose: () => void;
};

const STORAGE_KEY = "kh-ai-tools-history";

export const AIChatPanel = ({ open, onClose }: AIChatPanelProps) => {
  const [mode, setMode] = useState<AiMode>("remote");
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState("default");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Xin chào! Tôi có thể hỗ trợ nhanh về dịch vụ, dự án hoặc hướng dẫn sử dụng AI Tools.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { messages?: ChatMessage[]; mode?: AiMode; model?: string };
        if (parsed.messages?.length) setMessages(parsed.messages);
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.model) setModel(parsed.model);
      } catch {
        // ignore corrupted storage
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    aiClient
      .getModels()
      .then((data) => {
        if (Array.isArray(data.models) && data.models.length > 0) {
          setModels(data.models);
          setModel((prev) => (data.models.includes(prev) ? prev : data.models[0]));
        }
      })
      .catch(() => {
        setModels([]);
      });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, mode, model }));
  }, [messages, mode, model, open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const canSend = input.trim().length > 0 && !loading;

  const sendMessage = async () => {
    if (!canSend) return;
    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const response = await aiClient.chat({
        mode,
        model,
        messages: [...messages, userMsg],
        temperature: 0.7,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.content || "Mình chưa có phản hồi, vui lòng thử lại." },
      ]);
    } catch (err: any) {
      setError(err?.message || "Không thể kết nối AI, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const statusLabel = useMemo(() => {
    if (loading) return "Đang phản hồi...";
    if (error) return error;
    return "";
  }, [loading, error]);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-full max-w-md rounded-2xl border border-border bg-background shadow-elevated overflow-hidden">
      <div className="flex items-center justify-between bg-navy text-primary-foreground px-4 py-3">
        <div>
          <p className="text-sm font-semibold">AI Tools Assistant</p>
          <p className="text-xs text-primary-foreground/80">Tư vấn nhanh & hướng dẫn</p>
        </div>
        <button
          aria-label="Đóng"
          onClick={onClose}
          className="p-1 rounded-md hover:bg-primary-foreground/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <ModelSelector
          models={models}
          value={model}
          mode={mode}
          onModeChange={setMode}
          onChange={setModel}
        />
      </div>

      <div ref={listRef} className="max-h-[45vh] overflow-y-auto px-4 py-3 bg-secondary/20 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={`${msg.role}-${idx}`}
            className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "assistant"
                  ? "bg-primary-foreground/10 text-foreground"
                  : "bg-navy text-primary-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {statusLabel && (
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {statusLabel}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-background px-4 py-3">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Nhập câu hỏi..."
            className="flex-1 resize-none rounded-xl border border-border bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!canSend}
            className="h-10 w-10 rounded-lg bg-navy text-primary-foreground flex items-center justify-center disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
