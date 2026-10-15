export type AiProviderId = 'anthropic' | 'chrome' | 'ollama';

export interface AiSettings {
  provider: AiProviderId;
  anthropicKey: string;
  anthropicModel: string;
  ollamaUrl: string;
  ollamaModel: string;
}

export const DEFAULT_AI_SETTINGS: AiSettings = {
  provider: 'anthropic',
  anthropicKey: '',
  anthropicModel: 'claude-sonnet-5-5',
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3.1',
};

export interface AiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiRequest {
  system: string;
  /** Alternating user / assistant turns; the last one is always `user`. */
  messages: AiMessage[];
  /** Self-contained JSON Schema the provider may use to constrain its output. */
  schema?: object;
  signal?: AbortSignal;
}

export type AiProviderFn = (
  req: AiRequest,
  settings: AiSettings,
) => Promise<string>;
