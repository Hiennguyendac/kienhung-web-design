import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { aiClient } from "@/lib/aiClient";
import type { AiMode, ChatMessage, RagCitation, DataUploadResponse } from "@/lib/aiTypes";
import { ModelSelector } from "@/components/ai/ModelSelector";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Bot, FileText, Image, LayoutGrid, Sparkles, Upload, BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const isEnabled = (import.meta.env.VITE_AI_ENABLED as string) === "true";
const FREE_LIMIT = 20000;
const PRO_LIMIT = 200000;

const summarizePrompt =
  "Bạn là trợ lý biên tập. Hãy tóm tắt nội dung dưới đây thành 5 gạch đầu dòng rõ ý, súc tích, tiếng Việt.";
const seoPrompt =
  "Bạn là chuyên gia nội dung SEO. Hãy viết dàn ý bài viết chuẩn SEO (tiêu đề H1, H2, H3) kèm 5 bullet ý chính, tiếng Việt.";
const investmentSystemPrompt =
  "Bạn là trợ lý phân tích định hướng đầu tư. KHÔNG đưa ra lời khuyên tài chính bắt buộc. " +
  "Hãy: (1) phân loại nhà đầu tư, (2) gợi ý 2–3 chiến lược phù hợp, (3) phân tích ưu/nhược điểm, " +
  "(4) nêu rõ rủi ro, (5) kết thúc bằng lời khuyên trung lập, mang tính giáo dục.";

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

type HistoryRecord = {
  id: string;
  tool: string;
  input: string | null;
  output: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
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
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [dataSet, setDataSet] = useState<DataUploadResponse | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"line" | "bar" | "pie" | "heatmap">("line");
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [categoryKey, setCategoryKey] = useState("");
  const [valueKey, setValueKey] = useState("");
  const [heatX, setHeatX] = useState("");
  const [heatY, setHeatY] = useState("");
  const [heatValue, setHeatValue] = useState("");
  const [capital, setCapital] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [risk, setRisk] = useState("Trung bình");
  const [sector, setSector] = useState("");
  const [investOutput, setInvestOutput] = useState("");

  const [imagePrompt, setImagePrompt] = useState("");
  const [imageSize, setImageSize] = useState("1024x1024");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [imageUploadName, setImageUploadName] = useState("");

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
  const [proStatus, setProStatus] = useState<string | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyFilter, setHistoryFilter] = useState("all");
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  const periodKey = useMemo(() => getPeriodKey(), []);
  const authToken = session?.access_token ?? null;
  const usagePercent = usage
    ? Math.min(100, Math.round((usage.tokens_used / usage.tokens_limit) * 100))
    : 0;

  const isPro = usage?.plan === "pro" || session?.user.user_metadata?.plan === "pro";
  const isQuotaExceeded = usage ? usage.tokens_used >= usage.tokens_limit : false;
  const toolsLocked = !isEnabled || !session || !usage || isQuotaExceeded;

  const isChatModel = (value: string) =>
    /gpt|gemini|claude|llama|mistral|mixtral|deepseek|o1|o3|chat/i.test(value) &&
    !/babbage|davinci|curie|ada|text-/i.test(value);

  const resolveChatModel = () => {
    if (isChatModel(model)) return model;
    const fallback = models.find(isChatModel);
    return fallback ?? "gpt-4o-mini";
  };

  const dataRows = useMemo(() => {
    if (!dataSet) return [];
    return dataSet.rows.map((row) => {
      const record: Record<string, string | number | null> = {};
      dataSet.columns.forEach((col, idx) => {
        record[col] = row[idx] ?? null;
      });
      return record;
    });
  }, [dataSet]);

  const numericColumns = useMemo(() => {
    if (!dataSet) return [];
    return dataSet.columns.filter((col) => {
      let numericCount = 0;
      let total = 0;
      for (const row of dataSet.rows) {
        const value = row[dataSet.columns.indexOf(col)];
        if (value === null || value === undefined || value === "") continue;
        total += 1;
        const num = Number(String(value).replace(/,/g, ""));
        if (Number.isFinite(num)) numericCount += 1;
      }
      return total > 0 && numericCount / total >= 0.6;
    });
  }, [dataSet]);

  const getNumericColumnsFrom = (payload: DataUploadResponse) =>
    payload.columns.filter((col, index) => {
      let numericCount = 0;
      let total = 0;
      for (const row of payload.rows) {
        const value = row[index];
        if (value === null || value === undefined || value === "") continue;
        total += 1;
        const num = Number(String(value).replace(/,/g, ""));
        if (Number.isFinite(num)) numericCount += 1;
      }
      return total > 0 && numericCount / total >= 0.6;
    });

  const toNumber = (value: string | number | null) => {
    if (value === null || value === undefined) return null;
    const num = Number(String(value).replace(/,/g, ""));
    return Number.isFinite(num) ? num : null;
  };

  const chartData = useMemo(() => {
    if (!dataSet || !xKey || !yKey) return [];
    return dataRows
      .map((row) => ({
        name: String(row[xKey] ?? ""),
        value: toNumber(row[yKey]),
      }))
      .filter((row) => row.name && row.value !== null);
  }, [dataSet, dataRows, xKey, yKey]);

  const pieData = useMemo(() => {
    if (!dataSet || !categoryKey || !valueKey) return [];
    return dataRows
      .map((row) => ({
        name: String(row[categoryKey] ?? ""),
        value: toNumber(row[valueKey]),
      }))
      .filter((row) => row.name && row.value !== null);
  }, [dataSet, dataRows, categoryKey, valueKey]);

  const heatmapData = useMemo(() => {
    if (!dataSet || !heatX || !heatY || !heatValue) return [];
    return dataRows
      .map((row) => ({
        x: String(row[heatX] ?? ""),
        y: String(row[heatY] ?? ""),
        value: toNumber(row[heatValue]),
      }))
      .filter((row) => row.x && row.y && row.value !== null);
  }, [dataSet, dataRows, heatX, heatY, heatValue]);

  const buildInvestmentPrompt = () =>
    [
      `Số vốn: ${capital || "Chưa rõ"}`,
      `Mục tiêu: ${goal || "Chưa rõ"}`,
      `Thời gian: ${duration || "Chưa rõ"}`,
      `Mức rủi ro: ${risk || "Chưa rõ"}`,
      `Lĩnh vực quan tâm: ${sector || "Chưa rõ"}`,
    ].join("\n");

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
          await syncPlanIfNeeded(inserted as UsageRecord);
        }
      } else {
        setUsage(data as UsageRecord);
        await syncPlanIfNeeded(data as UsageRecord);
      }

      setUsageLoading(false);
    };

    loadUsage();
  }, [periodKey, session]);

  const refreshHistory = useCallback(async () => {
    if (!session) {
      setHistoryItems([]);
      return;
    }
    setHistoryLoading(true);
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("ai_history")
      .select("*")
      .eq("user_id", session.user.id)
      .gte("created_at", cutoff)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      console.error("history load failed", error);
      setHistoryError("Không thể tải lịch sử.");
    } else if (data) {
      setHistoryItems(data as HistoryRecord[]);
      setHistoryError(null);
    }
    setHistoryLoading(false);
  }, [session]);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  useEffect(() => {
    if (!session) {
      setProStatus(null);
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
        if (data?.status) setProStatus(data.status);
      })
      .catch(() => {});
  }, [session]);

  const syncPlanIfNeeded = async (nextUsage: UsageRecord) => {
    if (!session) return;
    if (nextUsage.plan !== "pro") return;
    if (nextUsage.tokens_used < nextUsage.tokens_limit) return;
    const { data } = await supabase.functions.invoke("plan-sync", {
      body: { period: periodKey },
    });
    if (data?.usage) {
      setUsage(data.usage as UsageRecord);
    }
  };

  const applyUsage = async (tokenDelta: number) => {
    if (!usage || !session) return;
    const nextTokens = usage.tokens_used + tokenDelta;
    const nextUsage = { ...usage, tokens_used: nextTokens };
    setUsage(nextUsage);
    await supabase.from("ai_usage").update({ tokens_used: nextTokens }).eq("id", usage.id);
    await syncPlanIfNeeded(nextUsage);
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
        emailRedirectTo: `${window.location.origin}/auth/callback`,
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
          model: resolveChatModel(),
          messages,
          temperature: 0.7,
        },
        authToken
      );
      const content = response.content || "";
      setOutput(content);
      const tokenDelta = estimateMessagesTokens(messages) + estimateTokens(response.content || "");
      await applyUsage(tokenDelta);
      await saveHistory("chat", input.trim(), content, { model: resolveChatModel() });
    } catch (err: any) {
      setError(err?.message || "Không thể kết nối AI.");
    } finally {
      setLoading(null);
    }
  };

  const handleSupabaseChat = async (
    input: string,
    setOutput: (value: string) => void,
    systemPrompt?: string,
    historyTool?: string
  ) => {
    if (!input.trim()) return;
    if (toolsLocked) {
      setError("Bạn cần đăng nhập và còn quota để sử dụng AI Tools.");
      return;
    }
    setLoading("chat");
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("openai-chat", {
        body: {
          messages: [{ role: "user", content: input.trim() }],
          systemPrompt,
          useWebsitePrompt: false,
        },
      });
      if (fnError) {
        throw new Error(fnError.message || "Không thể gọi AI. Vui lòng thử lại.");
      }
      const content = (data as { content?: string })?.content || "";
      setOutput(content);
      const tokenDelta = estimateTokens(input) + estimateTokens(content);
      await applyUsage(tokenDelta);
      if (historyTool) {
        await saveHistory(historyTool, input.trim(), content, { model: "openai-chat" });
      }
    } catch (err: any) {
      setError(err?.message || "Không thể kết nối AI.");
    } finally {
      setLoading(null);
    }
  };

  const handleDataFileChange = (file: File | null) => {
    setDataError(null);
    setDataFile(file);
  };

  const handleUploadData = async () => {
    if (!dataFile) return;
    if (!session) {
      setDataError("Vui lòng đăng nhập để sử dụng tính năng này.");
      return;
    }
    const maxSize = 10 * 1024 * 1024;
    if (dataFile.size > maxSize) {
      setDataError("Dung lượng tối đa 10MB.");
      return;
    }
    setDataLoading(true);
    setDataError(null);
    try {
      const response = await aiClient.uploadData(dataFile, authToken);
      setDataSet(response);
      const numericFromResponse = getNumericColumnsFrom(response);
      const firstTextColumn = response.columns.find((col) => !numericFromResponse.includes(col)) || response.columns[0];
      const firstNumericColumn = numericFromResponse[0] || response.columns[1] || response.columns[0];
      setXKey(firstTextColumn || "");
      setYKey(firstNumericColumn || "");
      setCategoryKey(firstTextColumn || "");
      setValueKey(firstNumericColumn || "");
      setHeatX(firstTextColumn || "");
      setHeatY(response.columns[1] || firstTextColumn || "");
      setHeatValue(firstNumericColumn || "");
      await saveHistory(
        "data-viz",
        dataFile.name,
        `Đã tải dữ liệu (${response.sampleSize}/${response.rowCount} dòng)`,
        {
          columns: response.columns,
          rowCount: response.rowCount,
          source: response.source,
        }
      );
    } catch (err: any) {
      setDataError(err?.message || "Không thể xử lý file.");
    } finally {
      setDataLoading(false);
    }
  };

  const saveHistory = async (
    tool: string,
    input: string,
    output: string,
    meta: Record<string, unknown> = {}
  ) => {
    if (!session) return;
    const { data, error } = await supabase
      .from("ai_history")
      .insert({
        user_id: session.user.id,
        tool,
        input,
        output,
        meta,
      })
      .select("*")
      .single();
    if (error) {
      console.error("history insert failed", error);
      setHistoryError("Không thể lưu lịch sử.");
      return;
    }
    if (data) {
      setHistoryError(null);
      await refreshHistory();
    }
  };

  const handleInvestment = async () => {
    if (!capital.trim() && !goal.trim() && !duration.trim() && !sector.trim()) return;
    await handleSupabaseChat(buildInvestmentPrompt(), setInvestOutput, investmentSystemPrompt, "investment");
  };

  const renderOutput = (value: string) => {
    const lines = value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) return null;
    const bulletLines = lines.filter((line) => /^[-*•]\s+|^\d+\.\s+/.test(line));
    if (bulletLines.length >= 2) {
      return (
        <ul className="ai-output-list">
          {lines.map((line, idx) => (
            <li key={`${line}-${idx}`}>{line.replace(/^[-*•]\s+|^\d+\.\s+/, "")}</li>
          ))}
        </ul>
      );
    }
    return (
      <div className="ai-output-text">
        {lines.map((line, idx) => (
          <p key={`${line}-${idx}`}>{line}</p>
        ))}
      </div>
    );
  };

  const renderSeoOutput = (value: string) => {
    const lines = value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) return null;
    return (
      <ul className="ai-output-list ai-output-list--seo">
        {lines.map((line, idx) => {
          const isKey = /^(H1|H2|H3|Tiêu đề|Title|Meta|Keyword|Từ khóa|Mô tả)/i.test(line);
          return (
            <li key={`${line}-${idx}`} className={isKey ? "ai-output-key" : undefined}>
              {line.replace(/^[-*•]\s+|^\d+\.\s+/, "")}
            </li>
          );
        })}
      </ul>
    );
  };

  const filteredHistory = useMemo(() => {
    if (historyFilter === "all") return historyItems;
    return historyItems.filter((item) => item.tool === historyFilter);
  }, [historyFilter, historyItems]);

  const selectedHistory = useMemo(() => {
    if (!selectedHistoryId) return null;
    return historyItems.find((item) => item.id === selectedHistoryId) || null;
  }, [historyItems, selectedHistoryId]);

  const handleDeleteHistory = async (id: string) => {
    await supabase.from("ai_history").delete().eq("id", id);
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedHistoryId === id) {
      setSelectedHistoryId(null);
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
          model: resolveChatModel(),
          messages,
          temperature: 0.7,
        },
        authToken
      );
      setRagAnswer(response.content || "");
      setRagCitations(response.citations || []);
      const tokenDelta = estimateMessagesTokens(messages) + estimateTokens(response.content || "");
      await applyUsage(tokenDelta);
      await saveHistory("rag", ragQuery.trim(), response.content || "", {
        model: resolveChatModel(),
        citations: response.citations || [],
      });
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
    setLoading(imageUploadUrl ? "image-edit" : "image");
    setError(null);
    setImageUrl("");
    try {
      if (imageUploadUrl) {
        const response = await aiClient.imageEdit(
          {
            imageUrl: imageUploadUrl,
            prompt: imagePrompt.trim(),
            size: imageSize,
          },
          authToken
        );
        const outputUrl = response.url || "";
        setImageUrl(outputUrl);
        await saveHistory("image-edit", imagePrompt.trim(), outputUrl, {
          imageUrl: imageUploadUrl,
          size: imageSize,
        });
      } else {
        const response = await aiClient.image(
          {
            mode,
            model,
            prompt: imagePrompt.trim(),
            size: imageSize,
          },
          authToken
        );
        const outputUrl = response.url || "";
        setImageUrl(outputUrl);
        await saveHistory("image", imagePrompt.trim(), outputUrl, { model, size: imageSize });
      }
      const baseCost = imageSize === "1024x1024" ? 2400 : 1200;
      const tokenDelta = baseCost + estimateTokens(imagePrompt);
      await applyUsage(tokenDelta);
    } catch (err: any) {
      setError(err?.message || "Không thể tạo ảnh.");
    } finally {
      setLoading(null);
    }
  };

  const handleImageFileChange = async (file: File | null) => {
    setError(null);
    setImageUploadUrl("");
    setImageUploadName("");
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Chỉ hỗ trợ JPG/PNG/WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Dung lượng tối đa 5MB.");
      return;
    }
    setLoading("image-upload");
    try {
      const response = await aiClient.uploadImage(file);
      setImageUploadUrl(response.url || "");
      setImageUploadName(file.name);
    } catch (err: any) {
      setError(err?.message || "Không thể upload ảnh.");
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
        noindex
      />
      <Header />
      <main className="bg-slate-950 text-slate-100 ai-tools">
        <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 ai-tools-shell">
          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="lg:w-64 flex-shrink-0 ai-tools-sidebar">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.35)] ai-panel ai-sidebar-card">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">AI Studio</p>
                <nav className="space-y-2 text-sm ai-sidebar-nav">
                  {[
                    { label: "Tổng quan", href: "#overview", icon: LayoutGrid },
                    { label: "Tạo ảnh", href: "#image", icon: Image, badge: "Beta" },
                    { label: "RAG Chat", href: "#rag", icon: Bot },
                    { label: "Data Visualization", href: "#data-viz", icon: BarChart3, badge: "New" },
                    { label: "Investment Advisor", href: "#advisor", icon: Sparkles },
                    { label: "Tóm tắt nhanh", href: "#summarize", icon: Sparkles },
                    { label: "SEO Draft", href: "#seo", icon: FileText, badge: "New" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-slate-200 hover:bg-white/5 transition-colors ai-sidebar-link"
                    >
                      <span className="ai-sidebar-link__left">
                        <span className="ai-sidebar-icon">
                          <item.icon size={16} />
                        </span>
                        <span>{item.label}</span>
                      </span>
                      <span className="ai-sidebar-link__right">
                        {item.badge ? <span className="ai-sidebar-badge">{item.badge}</span> : null}
                        <span className="text-xs text-slate-500 ai-sidebar-arrow">→</span>
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-5 ai-panel ai-sidebar-card">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Tài khoản</p>
                {session ? (
                  <div className="space-y-3 text-sm">
                    <div className="ai-profile">
                      <div className="ai-profile-avatar">
                        {(session.user.email || "U").slice(0, 1).toUpperCase()}
                      </div>
                      <div className="ai-profile-meta">
                        <p className="ai-profile-email">{session.user.email}</p>
                        <div className="ai-profile-tags">
                          <span className="ai-profile-tag ai-profile-tag--accent">
                            {usage ? usage.plan.toUpperCase() : "FREE"}
                          </span>
                          <span className="ai-profile-tag ai-profile-tag--muted">
                            {usage ? `${usage.tokens_used.toLocaleString()} tokens` : "0 tokens"}
                          </span>
                        </div>
                      </div>
                      <div className="ai-profile-stats">
                        <div>
                          <span>Quota</span>
                          <strong>
                            {usage
                              ? `${usage.tokens_used.toLocaleString()} / ${usage.tokens_limit.toLocaleString()}`
                              : "0 / 0"}
                          </strong>
                        </div>
                        <div>
                          <span>Trạng thái</span>
                          <strong>{isPro ? "Pro" : "Free"}</strong>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full rounded-lg border border-white/20 px-3 py-2 text-xs uppercase tracking-widest text-slate-200 hover:bg-white/10 ai-action-btn ai-action-btn--ghost"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Vui lòng đăng nhập để sử dụng AI Tools.</p>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-5 ai-panel ai-sidebar-card ai-history-panel">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">History</p>
                  <button
                    type="button"
                    onClick={refreshHistory}
                    className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-gold"
                  >
                    Refresh
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    { label: "All", value: "all" },
                    { label: "Chat", value: "chat" },
                    { label: "RAG", value: "rag" },
                    { label: "Image", value: "image" },
                    { label: "Edit", value: "image-edit" },
                    { label: "SEO", value: "seo" },
                    { label: "Sum", value: "summarize" },
                    { label: "Viz", value: "data-viz" },
                    { label: "Adv", value: "investment" },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => setHistoryFilter(filter.value)}
                      className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-widest ${
                        historyFilter === filter.value
                          ? "border-gold/60 text-gold bg-white/5"
                          : "border-white/10 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                {historyLoading ? (
                  <p className="text-xs text-slate-300">Đang tải...</p>
                ) : historyError ? (
                  <p className="text-xs text-rose-300">{historyError}</p>
                ) : filteredHistory.length === 0 ? (
                  <p className="text-xs text-slate-400">Chưa có lịch sử.</p>
                ) : (
                  <div className="ai-history-list">
                    {filteredHistory.slice(0, 10).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedHistoryId(item.id)}
                        className={`ai-history-row ${selectedHistoryId === item.id ? "ai-history-row--active" : ""}`}
                        title="Xem chi tiết"
                      >
                        <span>{item.tool}</span>
                        <span>{new Date(item.created_at).toLocaleDateString("vi-VN")}</span>
                      </button>
                    ))}
                  </div>
                )}

                {selectedHistory && (
                  <div className="ai-history-detail">
                    <div className="ai-history-detail__head">
                      <div>
                        <span className="ai-history-tool">{selectedHistory.tool}</span>
                        <span className="ai-history-time">
                          {new Date(selectedHistory.created_at).toLocaleString("vi-VN")}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteHistory(selectedHistory.id)}
                        className="ai-history-delete"
                      >
                        Xoá
                      </button>
                    </div>
                    {selectedHistory.input && (
                      <div className="ai-history-block">
                        <p className="ai-history-label">Input</p>
                        <pre>{selectedHistory.input}</pre>
                      </div>
                    )}
                    {selectedHistory.output && (
                      <div className="ai-history-block">
                        <p className="ai-history-label">Output</p>
                        <pre>{selectedHistory.output}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </aside>

            <section className="flex-1 space-y-8 ai-tools-main">
              <div
                id="overview"
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-800/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] ai-panel ai-hero"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3 ai-hero-kicker">AI tools studio</p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white ai-hero-title">
                      Trung tâm trải nghiệm AI cho Kiến Hưng
                    </h1>
                    <p className="text-slate-300 mt-3 max-w-xl ai-hero-subtitle">
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
                    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 ai-usage-card">
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
                      {isPro ? (
                        <span className="mt-3 inline-flex text-xs uppercase tracking-widest text-emerald-300 ai-usage-cta">
                          Gói Pro
                        </span>
                      ) : (
                        <Link
                          to="/ai-tools/pro"
                          className="mt-3 inline-flex text-xs uppercase tracking-widest text-gold hover:text-yellow-300 ai-usage-cta"
                        >
                          Nâng cấp Pro
                        </Link>
                      )}
                      {proStatus === "pending" && (
                        <span className="mt-1 text-xs text-gold/80">Đang chờ duyệt</span>
                      )}
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
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ai-panel"
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
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                    placeholder="Ví dụ: Làm ảnh sáng hơn, tông màu điện ảnh, giữ chủ thể..."
                    disabled={toolsLocked}
                  />
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="text-xs text-slate-300">
                        Upload ảnh (JPG/PNG/WebP, tối đa 5MB)
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        disabled={toolsLocked || loading === "image-upload"}
                        onChange={(e) => handleImageFileChange(e.target.files?.[0] ?? null)}
                        className="text-xs text-slate-300"
                      />
                    </div>
                    {imageUploadUrl && (
                      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-xs text-slate-200">
                        <span>Đã upload: {imageUploadName || "Ảnh"}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setImageUploadUrl("");
                            setImageUploadName("");
                          }}
                          className="text-gold hover:text-yellow-300"
                        >
                          Xoá
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <select
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value)}
                      disabled={toolsLocked}
                      className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-100 ai-input"
                    >
                      <option value="512x512">512x512</option>
                      <option value="1024x1024">1024x1024</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleImage}
                      disabled={loading === "image" || loading === "image-edit" || toolsLocked}
                      className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60 ai-action-btn"
                    >
                      {loading === "image" || loading === "image-edit"
                        ? "Đang xử lý..."
                        : imageUploadUrl
                          ? "Chỉnh sửa ảnh"
                          : "Tạo ảnh"}
                    </button>
                  </div>
                  {(imageUploadUrl || imageUrl) && (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {imageUploadUrl && (
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-widest text-slate-400">Ảnh gốc</p>
                          <img
                            src={imageUploadUrl}
                            alt="Uploaded"
                            className="w-full rounded-2xl border border-white/10 object-cover"
                          />
                        </div>
                      )}
                      {imageUrl && (
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-widest text-slate-400">Ảnh sau chỉnh sửa</p>
                          <img
                            src={imageUrl}
                            alt="AI edited"
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
                  )}
                </div>

                <div
                  id="rag"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ai-panel"
                >
                  <h2 className="text-lg font-semibold text-white mb-3">RAG Chat</h2>
                  <p className="text-sm text-slate-300 mb-4">Hỏi đáp tài liệu nội bộ, trả lời kèm nguồn tham chiếu.</p>
                  <textarea
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                    placeholder="Nhập câu hỏi..."
                    disabled={toolsLocked}
                  />
                  <button
                    type="button"
                    onClick={handleRag}
                    disabled={loading === "rag" || toolsLocked}
                    className="mt-4 rounded-lg border border-gold/60 px-4 py-2 text-sm font-semibold text-gold disabled:opacity-60 ai-action-btn ai-action-btn--ghost"
                  >
                    {loading === "rag" ? "Đang xử lý..." : "Gửi RAG"}
                  </button>
                  {ragAnswer && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 ai-output ai-output--rag">
                      <div className="ai-output-header">
                        <span>RAG Answer</span>
                        <span className="ai-output-tag">Có nguồn</span>
                      </div>
                      {renderOutput(ragAnswer)}
                    </div>
                  )}
                  {ragCitations.length > 0 && (
                    <div className="mt-4 space-y-2 text-xs text-slate-300 ai-citations">
                      <p className="font-semibold uppercase text-slate-400">Citations</p>
                      {ragCitations.map((cite, idx) => (
                        <div key={`${cite.url || cite.title}-${idx}`} className="ai-citation-card">
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

              <div
                id="data-viz"
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ai-panel"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-1">Interactive Data Visualization</h2>
                    <p className="text-sm text-slate-300">
                      Upload CSV / Excel / PDF để tự động tạo biểu đồ. Yêu cầu đăng nhập.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    <Upload size={14} />
                    Tối đa 10MB
                  </span>
                </div>

                <div className="mt-4 grid lg:grid-cols-[1.2fr_1fr] gap-6">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Upload dữ liệu</p>
                    <div className="flex flex-col gap-3">
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls,.pdf"
                        onChange={(e) => handleDataFileChange(e.target.files?.[0] ?? null)}
                        className="text-xs text-slate-300"
                        disabled={!session}
                      />
                      {dataFile && (
                        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-xs text-slate-200">
                          <span>{dataFile.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setDataFile(null);
                              setDataSet(null);
                            }}
                            className="text-gold hover:text-yellow-300"
                          >
                            Xoá
                          </button>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={handleUploadData}
                        disabled={!dataFile || dataLoading || !session}
                        className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60 ai-action-btn"
                      >
                        {dataLoading ? "Đang xử lý..." : "Upload & phân tích"}
                      </button>
                      {!session && <p className="text-xs text-slate-400">Vui lòng đăng nhập để dùng tính năng này.</p>}
                      {dataError && <p className="text-xs text-rose-300">{dataError}</p>}
                      {dataSet && (
                        <p className="text-xs text-slate-300">
                          Đã đọc {dataSet.sampleSize} / {dataSet.rowCount} dòng ({dataSet.source.toUpperCase()}).
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Chọn biểu đồ</p>
                    <div className="grid gap-3">
                      <select
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value as typeof chartType)}
                        className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                      >
                        <option value="line">Line</option>
                        <option value="bar">Bar</option>
                        <option value="pie">Pie/Donut</option>
                        <option value="heatmap">Heatmap</option>
                      </select>

                      {dataSet && (chartType === "line" || chartType === "bar") && (
                        <div className="grid grid-cols-2 gap-3">
                          <select
                            value={xKey}
                            onChange={(e) => setXKey(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                          >
                            {dataSet.columns.map((col) => (
                              <option key={col} value={col}>
                                Trục X: {col}
                              </option>
                            ))}
                          </select>
                          <select
                            value={yKey}
                            onChange={(e) => setYKey(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                          >
                            {numericColumns.map((col) => (
                              <option key={col} value={col}>
                                Trục Y: {col}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {dataSet && chartType === "pie" && (
                        <div className="grid grid-cols-2 gap-3">
                          <select
                            value={categoryKey}
                            onChange={(e) => setCategoryKey(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                          >
                            {dataSet.columns.map((col) => (
                              <option key={col} value={col}>
                                Nhóm: {col}
                              </option>
                            ))}
                          </select>
                          <select
                            value={valueKey}
                            onChange={(e) => setValueKey(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                          >
                            {numericColumns.map((col) => (
                              <option key={col} value={col}>
                                Giá trị: {col}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {dataSet && chartType === "heatmap" && (
                        <div className="grid grid-cols-3 gap-3">
                          <select
                            value={heatX}
                            onChange={(e) => setHeatX(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                          >
                            {dataSet.columns.map((col) => (
                              <option key={col} value={col}>
                                Trục X: {col}
                              </option>
                            ))}
                          </select>
                          <select
                            value={heatY}
                            onChange={(e) => setHeatY(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                          >
                            {dataSet.columns.map((col) => (
                              <option key={col} value={col}>
                                Trục Y: {col}
                              </option>
                            ))}
                          </select>
                          <select
                            value={heatValue}
                            onChange={(e) => setHeatValue(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                          >
                            {numericColumns.map((col) => (
                              <option key={col} value={col}>
                                Giá trị: {col}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 mb-3">
                    <BarChart3 size={14} /> Preview chart
                  </div>
                  {!dataSet && <p className="text-sm text-slate-400">Hãy upload dữ liệu để hiển thị biểu đồ.</p>}
                  {dataSet && chartType === "line" && (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                          <YAxis stroke="#94a3b8" fontSize={12} />
                          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} />
                          <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  {dataSet && chartType === "bar" && (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                          <YAxis stroke="#94a3b8" fontSize={12} />
                          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} />
                          <Bar dataKey="value" fill="#facc15" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  {dataSet && chartType === "pie" && (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={50}
                            outerRadius={80}
                            stroke="none"
                          >
                            {pieData.map((_, index) => (
                              <Cell
                                key={index}
                                fill={["#38bdf8", "#facc15", "#22c55e", "#f97316"][index % 4]}
                              />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  {dataSet && chartType === "heatmap" && (
                    <div className="grid gap-2 text-xs text-slate-200">
                      {heatmapData.slice(0, 30).map((row, idx) => (
                        <div
                          key={`${row.x}-${row.y}-${idx}`}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                        >
                          <span className="text-slate-100">{row.x}</span>
                          <span className="text-slate-400">{row.y}</span>
                          <span className="font-semibold text-gold">{row.value}</span>
                        </div>
                      ))}
                      {heatmapData.length > 30 && (
                        <p className="text-xs text-slate-400">Hiển thị 30 dòng đầu tiên.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div
                id="advisor"
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ai-panel"
              >
                <h2 className="text-lg font-semibold text-white mb-3">Investment Advisor</h2>
                <p className="text-sm text-slate-300 mb-4">
                  Trợ lý phân tích định hướng đầu tư (không đưa ra lời khuyên tài chính bắt buộc).
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    placeholder="Số vốn (ví dụ: 500 triệu)"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                    disabled={toolsLocked}
                  />
                  <input
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="Mục tiêu (tăng trưởng / an toàn...)"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                    disabled={toolsLocked}
                  />
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Thời gian (6 tháng / 2 năm...)"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                    disabled={toolsLocked}
                  />
                  <select
                    value={risk}
                    onChange={(e) => setRisk(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                    disabled={toolsLocked}
                  >
                    <option>Thấp</option>
                    <option>Trung bình</option>
                    <option>Cao</option>
                  </select>
                </div>
                <input
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  placeholder="Lĩnh vực quan tâm (BĐS, công nghệ...)"
                  className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                  disabled={toolsLocked}
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleInvestment}
                    disabled={loading === "chat" || toolsLocked}
                    className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60 ai-action-btn"
                  >
                    {loading === "chat" ? "Đang phân tích..." : "Phân tích"}
                  </button>
                </div>
                {investOutput && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 ai-output ai-output--advisor">
                    <div className="ai-output-header">
                      <span>Investment Advisor</span>
                      <span className="ai-output-tag">Trung lập</span>
                    </div>
                    {renderOutput(investOutput)}
                    <p className="ai-output-note">
                      Lưu ý: Thông tin chỉ mang tính giáo dục, không phải lời khuyên tài chính bắt buộc.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid xl:grid-cols-2 gap-6">
                <div
                  id="summarize"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ai-panel"
                >
                  <h2 className="text-lg font-semibold text-white mb-3">Quick Summarize</h2>
                  <p className="text-sm text-slate-300 mb-4">Tóm tắt nội dung dài thành gạch đầu dòng ngắn gọn.</p>
                  <textarea
                    value={summarizeInput}
                    onChange={(e) => setSummarizeInput(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                    placeholder="Dán nội dung cần tóm tắt..."
                    disabled={toolsLocked}
                  />
                  <button
                    type="button"
                    onClick={() => handleSupabaseChat(summarizeInput, setSummarizeOutput, summarizePrompt, "summarize")}
                    disabled={loading === "chat" || toolsLocked}
                    className="mt-4 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60 ai-action-btn"
                  >
                    {loading === "chat" ? "Đang xử lý..." : "Tóm tắt"}
                  </button>
                  {summarizeOutput && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 ai-output ai-output--summary">
                      <div className="ai-output-header">
                        <span>Quick Summarize</span>
                        <span className="ai-output-tag">Tối ưu</span>
                      </div>
                      {renderOutput(summarizeOutput)}
                    </div>
                  )}
                </div>

                <div
                  id="seo"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ai-panel"
                >
                  <h2 className="text-lg font-semibold text-white mb-3">SEO Draft</h2>
                  <p className="text-sm text-slate-300 mb-4">Gợi ý dàn ý chuẩn SEO và các ý chính nổi bật.</p>
                  <textarea
                    value={seoInput}
                    onChange={(e) => setSeoInput(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 ai-input"
                    placeholder="Nhập chủ đề hoặc keyword..."
                    disabled={toolsLocked}
                  />
                  <button
                    type="button"
                    onClick={() => handleSupabaseChat(seoInput, setSeoOutput, seoPrompt, "seo")}
                    disabled={loading === "chat" || toolsLocked}
                    className="mt-4 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60 ai-action-btn"
                  >
                    {loading === "chat" ? "Đang xử lý..." : "Tạo dàn ý"}
                  </button>
                  {seoOutput && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 ai-output ai-output--seo">
                      <div className="ai-output-header">
                        <span>SEO Draft</span>
                        <span className="ai-output-tag">Chuyên nghiệp</span>
                      </div>
                      {renderSeoOutput(seoOutput)}
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
