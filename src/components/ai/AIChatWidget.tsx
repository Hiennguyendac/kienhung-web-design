import { useState } from "react";
import { Bot } from "lucide-react";
import { AIChatPanel } from "./AIChatPanel";

const isEnabled = (import.meta.env.VITE_AI_ENABLED as string) === "true";

export const AIChatWidget = () => {
  const [open, setOpen] = useState(false);

  if (!isEnabled) return null;

  return (
    <>
      {!open && (
        <button
          aria-label="Mở trợ lý AI"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-navy text-primary-foreground px-4 py-3 shadow-elevated hover:bg-navy/90 transition-colors"
        >
          <Bot className="w-4 h-4" />
          <span className="font-medium text-sm">AI Trợ lý</span>
        </button>
      )}
      <AIChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
};
