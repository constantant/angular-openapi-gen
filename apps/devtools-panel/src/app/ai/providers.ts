import type {
  AiProviderFn,
  AiProviderId,
  AiRequest,
  AiSettings,
} from './ai-types';

async function readError(res: Response): Promise<string> {
  const text = await res.text().catch(() => '');
  try {
    const body = JSON.parse(text) as { error?: { message?: string } | string };
    const err = body.error;
    return typeof err === 'string' ? err : (err?.message ?? text);
  } catch {
    return text || res.statusText;
  }
}

export const anthropicProvider: AiProviderFn = async (req, s) => {
  if (!s.anthropicKey.trim())
    throw new Error('Set your Anthropic API key in the AI settings.');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    signal: req.signal,
    headers: {
      'content-type': 'application/json',
      'x-api-key': s.anthropicKey.trim(),
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: s.anthropicModel,
      max_tokens: 8192,
      system: req.system,
      messages: req.messages,
    }),
  });
  if (!res.ok)
    throw new Error(`Anthropic ${res.status}: ${await readError(res)}`);
  const body = (await res.json()) as {
    content?: { type: string; text?: string }[];
  };
  return (body.content ?? [])
    .map((b) => (b.type === 'text' ? (b.text ?? '') : ''))
    .join('');
};

export const ollamaProvider: AiProviderFn = async (req, s) => {
  const base = s.ollamaUrl.trim().replace(/\/+$/, '');
  const res = await fetch(`${base}/api/chat`, {
    method: 'POST',
    signal: req.signal,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: s.ollamaModel,
      stream: false,
      format: req.schema ?? 'json',
      messages: [{ role: 'system', content: req.system }, ...req.messages],
    }),
  }).catch((e: Error) => {
    if (e.name === 'AbortError') throw e;
    return null;
  });
  if (!res) throw new Error(`Cannot reach Ollama at ${base}. Is it running?`);
  if (res.status === 403) {
    throw new Error(
      'Ollama rejected the extension origin. Start it with OLLAMA_ORIGINS="chrome-extension://*".',
    );
  }
  if (!res.ok) throw new Error(`Ollama ${res.status}: ${await readError(res)}`);
  const body = (await res.json()) as { message?: { content?: string } };
  return body.message?.content ?? '';
};

// Chrome's built-in Prompt API (Gemini Nano). Minimal typings: it is not in lib.dom yet.
interface LanguageModelSession {
  prompt(
    input: string,
    options?: { signal?: AbortSignal; responseConstraint?: object },
  ): Promise<string>;
  destroy(): void;
}
interface LanguageModelStatic {
  availability(
    options?: object,
  ): Promise<'unavailable' | 'downloadable' | 'downloading' | 'available'>;
  create(options?: object): Promise<LanguageModelSession>;
}

const CHROME_OPTIONS = {
  expectedInputs: [{ type: 'text', languages: ['en'] }],
  expectedOutputs: [{ type: 'text', languages: ['en'] }],
};

function chromeModel(): LanguageModelStatic | null {
  return (
    (globalThis as { LanguageModel?: LanguageModelStatic }).LanguageModel ??
    null
  );
}

export async function chromeAvailability(): Promise<string> {
  const lm = chromeModel();
  if (!lm) return 'unsupported';
  try {
    return await lm.availability(CHROME_OPTIONS);
  } catch {
    return 'unsupported';
  }
}

export const chromeProvider: AiProviderFn = async (req) => {
  const lm = chromeModel();
  if (!lm)
    throw new Error(
      'The Chrome built-in Prompt API is not available in this browser.',
    );
  const state = await lm.availability(CHROME_OPTIONS);
  if (state === 'unavailable')
    throw new Error('Chrome reports the built-in model as unavailable.');

  const last = req.messages[req.messages.length - 1];
  const session = await lm.create({
    ...CHROME_OPTIONS,
    signal: req.signal,
    initialPrompts: [
      { role: 'system', content: req.system },
      ...req.messages.slice(0, -1),
    ],
  });
  try {
    return await session.prompt(last.content, {
      signal: req.signal,
      ...(req.schema ? { responseConstraint: req.schema } : {}),
    });
  } finally {
    session.destroy();
  }
};

const PROVIDERS: Record<AiProviderId, AiProviderFn> = {
  anthropic: anthropicProvider,
  chrome: chromeProvider,
  ollama: ollamaProvider,
};

export function callProvider(
  req: AiRequest,
  settings: AiSettings,
): Promise<string> {
  return PROVIDERS[settings.provider](req, settings);
}
