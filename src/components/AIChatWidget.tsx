import { useEffect, useRef, useState } from "react";
import { Send, X, Bot, Loader2 } from "lucide-react";
import { useAIChat, ChatMessage } from "@/hooks/useAIChat";
import { Button } from "@/components/ui/button";

export const AIChatWidget = () => {
  const { chat, loading, error } = useAIChat();
  const systemMessage: ChatMessage = {
    role: "system",
    content:
      "Bạn là trợ lý AI của Kiến Hưng Investment. Trả lời ngắn gọn, chuyên nghiệp bằng tiếng Việt. " +
      "Luôn ưu tiên hướng người dùng đến các trang: /yeu-cau-bao-gia, /dat-lich-hen, /tin-tuc, /case-studies. " +
      "Nếu người dùng hỏi dịch vụ, hãy gợi ý đúng lĩnh vực: thương mại & phân phối, CNTT, marketing, logistics, giáo dục & đào tạo.",
  };
  const quickSuggestions = [
    "Tôi muốn nhận tư vấn đầu tư",
    "Làm sao để đặt lịch hẹn?",
    "Các dịch vụ chính của Kiến Hưng là gì?",
    "Cho tôi xem case study tiêu biểu",
  ];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Xin chào! Tôi là trợ lý AI của Kiến Hưng Investment. Tôi có thể giúp bạn tìm hiểu về công ty, các dịch vụ, hoặc hướng dẫn bạn đến trang thông tin phù hợp. Bạn cần hỗ trợ gì?",
    },
  ]);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    const reply = await chat([systemMessage, ...messages, userMsg]);
    if (reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Parse and render links in message content
  const renderContent = (content: string) => {
    // Convert markdown-style links and plain paths to clickable links
    const linkRegex = /(\/([\w-]+)?)/g;
    const parts = content.split(linkRegex);
    
    return content.split(/(\s)/).map((word, idx) => {
      if (word.match(/^\/[\w-]*$/)) {
        return (
          <a
            key={idx}
            href={word}
            className="text-navy underline hover:text-navy/80 font-medium"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = word;
            }}
          >
            {word}
          </a>
        );
      }
      return word;
    });
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
            <p className="text-xs text-primary-foreground/80">Hỏi đáp & hướng dẫn</p>
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
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "assistant"
                  ? "bg-primary-foreground/10 text-foreground"
                  : "bg-navy text-primary-foreground"
              }`}
            >
              {msg.role === "assistant" ? renderContent(msg.content) : msg.content}
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
        <div className="mb-3 flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setInput(suggestion)}
              className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground hover:text-navy hover:border-navy/40"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Nhập câu hỏi về Kiến Hưng..."
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
