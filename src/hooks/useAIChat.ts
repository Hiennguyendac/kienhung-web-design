import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const useAIChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chat = async (messages: ChatMessage[]) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("openai-chat", {
        body: { messages },
      });

      if (fnError) {
        throw new Error(fnError.message || "Không thể gọi AI. Vui lòng thử lại.");
      }

      return (data as { content?: string })?.content || "";
    } catch (e: any) {
      setError(e.message || "Có lỗi xảy ra");
      return "";
    } finally {
      setLoading(false);
    }
  };

  return { chat, loading, error };
};
