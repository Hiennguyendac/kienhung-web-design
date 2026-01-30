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

export type ImageRequest = {
  mode: AiMode;
  model: string;
  prompt: string;
  size?: string;
};

export type ImageResponse = {
  url: string;
  revised_prompt?: string;
};

export type ImageUploadResponse = {
  url: string;
  path?: string;
  filename?: string;
  size?: number;
  mime?: string;
};

export type ImageEditRequest = {
  imageUrl: string;
  prompt: string;
  size?: string;
};

export type ImageEditResponse = {
  url: string;
};
