export type AiMode = "local" | "remote";

export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatRequest = {
  mode: AiMode;
  model: string;
  messages: ChatMessage[];
  temperature?: number;
};

export type ChatResponse = {
  content: string;
  model?: string;
};

export type RagCitation = {
  title?: string;
  url?: string;
  snippet?: string;
};

export type RagResponse = {
  content: string;
  citations?: RagCitation[];
  model?: string;
};

export type ModelsResponse = {
  models: string[];
};
