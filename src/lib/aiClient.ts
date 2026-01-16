import type { ChatRequest, ChatResponse, ModelsResponse, RagResponse } from "./aiTypes";

const API_BASE = (import.meta.env.VITE_AI_API_BASE as string) || "/api-ai";
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_RETRY = 1;

type RequestOptions = {
  timeoutMs?: number;
  retry?: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestJson<T>(
  path: string,
  init: RequestInit = {},
  options: RequestOptions = {}
): Promise<T> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const retry = options.retry ?? DEFAULT_RETRY;
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= retry; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init.headers || {}),
        },
        signal: controller.signal,
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || `AI API error (${res.status})`);
      }

      try {
        return JSON.parse(text) as T;
      } catch {
        throw new Error("AI Gateway returned non-JSON response. Check /api-ai configuration.");
      }
    } catch (err) {
      lastError = err;
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      const isNetwork = err instanceof TypeError;
      if (attempt < retry && (isAbort || isNetwork)) {
        await sleep(300);
        continue;
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw lastError;
}

export const aiClient = {
  getHealth: () => requestJson<{ status: string }>("/health", {}, { retry: 0 }),
  getModels: () => requestJson<ModelsResponse>("/models", {}, { retry: 1 }),
  chat: (payload: ChatRequest) => requestJson<ChatResponse>("/chat", { method: "POST", body: JSON.stringify(payload) }),
  ragChat: (payload: ChatRequest) =>
    requestJson<RagResponse>("/rag/chat", { method: "POST", body: JSON.stringify(payload) }),
};
