import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const useAIChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) return null;
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      },
    });
  }, [supabaseUrl, supabaseAnonKey]);

  const chat = async (messages: ChatMessage[]) => {
    if (!supabase) {
      throw new Error("Thiếu cấu hình Supabase (VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY).");
    }

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
