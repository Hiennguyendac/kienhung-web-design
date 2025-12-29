import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X, Bot, Loader2 } from "lucide-react";
import { useAIChat, ChatMessage } from "@/hooks/useAIChat";
import { Button } from "@/components/ui/button";

const systemPrompt: ChatMessage = {
  role: "system",
  content:
    "Bạn là trợ lý AI cho website Kiến Hưng. Trả lời ngắn gọn, chuyên nghiệp, tập trung vào thông tin doanh nghiệp và hỗ trợ khách.",
};

export const AIChatWidget = () => {
  const { chat, loading, error } = useAIChat();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Chào bạn! Tôi có thể hỗ trợ gì về Kiến Hưng Investment?",
    },
  ]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const safeMessages = useMemo<ChatMessage[]>(() => {
    // Đảm bảo luôn có system prompt khi gọi API
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    return [systemPrompt, ...history];
  }, [messages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const reply = await chat([...safeMessages, userMsg]);
    if (reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    }
  };

  if (!open) {
    return (
      <button
        aria-label="Mở trợ lý AI"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-navy text-primary-foreground px-4 py-3 shadow-elevated hover:bg-navy/90 transition-colors"
      >
        <Bot className="w-4 h-4" />
        <span className="font-medium text-sm">AI Trợ lý</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md rounded-2xl border border-border bg-background shadow-elevated flex flex-col overflow-hidden">
      <div className="flex items-center justify-between bg-navy text-primary-foreground px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <div>
            <p className="text-sm font-semibold">AI Trợ lý Kiến Hưng</p>
            <p className="text-xs text-primary-foreground/80">Chat & gợi ý nội dung</p>
          </div>
        </div>
        <button
          aria-label="Đóng"
          onClick={() => setOpen(false)}
          className="p-1 rounded-md hover:bg-primary-foreground/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="flex-1 max-h-[50vh] overflow-y-auto space-y-3 px-4 py-3 bg-secondary/30"
      >
        {messages.map((msg, idx) => (
          <div
            key={`${msg.role}-${idx}`}
            className={`w-full flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-primary-foreground/10 text-foreground"
                  : "bg-navy text-primary-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Đang phản hồi...
          </div>
        )}
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>

      <div className="border-t border-border bg-background px-4 py-3">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="Nhập câu hỏi hoặc yêu cầu gợi ý..."
            className="flex-1 resize-none rounded-xl border border-border bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
          />
          <Button
            type="button"
            size="icon"
            variant="default"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="self-end h-10 w-10 rounded-lg"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
