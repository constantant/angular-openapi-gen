import { InjectionToken, inject } from '@angular/core';
import { AI_SETTINGS } from './ai-settings.token';
import { extractJson, isSelfContained, schemaForPrompt } from './json-utils';
import { callProvider } from './providers';
import type { AiMessage, AiSettings } from './ai-types';

export interface GenerateMockOptions {
  /** Full response schema (may use `definitions`); used for validation. */
  schema: unknown;
  prompt: string;
  /** Existing JSON the user chose to share as a style reference. Never sent unless set. */
  example?: unknown;
  /** `GET /pets/{id}` — context for the model only. */
  operation?: string;
  signal?: AbortSignal;
  /** How many times validation errors are fed back to the model. Default 2. */
  maxRepairs?: number;
  onAttempt?: (attempt: number) => void;
}

export interface GenerateMockResult {
  value: unknown;
  /** Empty when the value satisfies the schema; otherwise what is still wrong after the repairs. */
  errors: string[];
  attempts: number;
}

export interface AiMockGenerator {
  generate(options: GenerateMockOptions): Promise<GenerateMockResult>;
}

const SYSTEM = [
  'You generate realistic JSON mock responses for an HTTP API, to be used in frontend development.',
  'Reply with ONLY the JSON value: no prose, no markdown fences.',
  'The JSON must validate against the JSON Schema you are given. Fill every required property,',
  'use plausible, internally consistent values (matching ids, sensible dates, real-looking names),',
  'and respect formats, enums, minimum/maximum and string lengths. Keep arrays short (2-5 items)',
  'unless the user asks for more.',
].join(' ');

function buildFirstMessage(o: GenerateMockOptions): string {
  const parts = [
    ...(o.operation ? [`Operation: ${o.operation}`] : []),
    `JSON Schema of the response:\n${schemaForPrompt(o.schema)}`,
    ...(o.example !== undefined
      ? [
          `Existing response to use as a style reference:\n${JSON.stringify(o.example).slice(0, 12_000)}`,
        ]
      : []),
    `Request: ${o.prompt.trim() || 'Generate one realistic response.'}`,
  ];
  return parts.join('\n\n');
}

async function validate(schema: unknown, value: unknown): Promise<string[]> {
  const { Validator } = await import('@cfworker/json-schema');
  const result = new Validator(
    schema as ConstructorParameters<typeof Validator>[0],
  ).validate(value);
  return result.valid
    ? []
    : result.errors.map(
        (e) => `${e.instanceLocation || '(root)'} ${e.error ?? 'invalid'}`,
      );
}

export async function generateMock(
  o: GenerateMockOptions,
  settings: AiSettings,
  call: typeof callProvider = callProvider,
): Promise<GenerateMockResult> {
  const maxRepairs = o.maxRepairs ?? 2;
  const messages: AiMessage[] = [
    { role: 'user', content: buildFirstMessage(o) },
  ];
  const constraint = isSelfContained(o.schema) ? o.schema : undefined;

  let value: unknown;
  let errors: string[] = [];
  for (let attempt = 1; attempt <= maxRepairs + 1; attempt++) {
    o.onAttempt?.(attempt);
    const reply = await call(
      { system: SYSTEM, messages, schema: constraint, signal: o.signal },
      settings,
    );

    let problem: string[];
    try {
      value = extractJson(reply);
      errors = await validate(o.schema, value);
      problem = errors;
    } catch (e) {
      value = undefined;
      errors = problem = [`Reply is not valid JSON: ${(e as Error).message}`];
    }
    if (problem.length === 0) return { value, errors: [], attempts: attempt };

    messages.push(
      { role: 'assistant', content: reply },
      {
        role: 'user',
        content:
          'That does not satisfy the schema:\n' +
          problem
            .slice(0, 20)
            .map((p) => `- ${p}`)
            .join('\n') +
          '\nReply again with the corrected JSON only.',
      },
    );
  }
  if (value === undefined) throw new Error(errors.join('; '));
  return { value, errors, attempts: maxRepairs + 1 };
}

export const AI_MOCK_GENERATOR = new InjectionToken<AiMockGenerator>(
  'AI_MOCK_GENERATOR',
  {
    providedIn: 'root',
    factory: () => {
      const store = inject(AI_SETTINGS);
      return { generate: (options) => generateMock(options, store.settings()) };
    },
  },
);
