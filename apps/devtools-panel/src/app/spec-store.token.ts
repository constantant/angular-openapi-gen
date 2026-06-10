import { InjectionToken, Signal, computed, signal } from '@angular/core';

export interface ManifestMock {
  tokenName: string;
  operationId: string;
  path: string;
  method: string;
  tag?: string;
}

export interface SpecEntry {
  specId: string;
  addedAt: number;
  mocks: ManifestMock[];
  /** Response JSON Schemas keyed by operationId. Present when imported from a full OpenAPI spec. */
  responseSchemas?: Record<string, unknown>;
}

export interface SpecStore {
  readonly specs: Signal<ReadonlyMap<string, SpecEntry>>;
  /** Look up a ManifestMock by tokenName across all registered specs. */
  readonly findMock: (tokenName: string) => ManifestMock & { specId: string } | undefined;
  /** Get the response JSON Schema for a specific operation. */
  findSchema(specId: string, operationId: string): unknown;
  addFromManifest(json: unknown): Promise<void>;
  addFromOpenApiSpec(json: unknown, specId: string): Promise<void>;
  remove(specId: string): Promise<void>;
}

const STORAGE_KEY = 'oarm_specs';

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Matches the generator's toScreamingSnake — must stay in sync. */
function toScreamingSnake(str: string): string {
  return str
    .replace(/\//g, '_')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s.]+/g, '_')
    .toUpperCase()
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/** Rewrite #/components/schemas/X → #/definitions/X so json-schema-faker can resolve refs. */
function rewriteRefs(obj: unknown): unknown {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(rewriteRefs);
  const r = obj as Record<string, unknown>;
  if ('$ref' in r && typeof r['$ref'] === 'string' && r['$ref'].startsWith('#/components/schemas/')) {
    return { $ref: '#/definitions/' + r['$ref'].slice('#/components/schemas/'.length) };
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(r)) out[k] = rewriteRefs(v);
  return out;
}

function parseManifest(json: unknown): { specId: string; mocks: ManifestMock[] } {
  if (!json || typeof json !== 'object') throw new Error('Not a valid JSON object');
  const obj = json as Record<string, unknown>;
  if (typeof obj['specId'] !== 'string' || !obj['specId'])
    throw new Error('Missing or empty "specId" field');
  if (!Array.isArray(obj['mocks']))
    throw new Error('Missing "mocks" array');
  const mocks: ManifestMock[] = (obj['mocks'] as unknown[]).map((m, i) => {
    if (!m || typeof m !== 'object') throw new Error(`mocks[${i}] is not an object`);
    const r = m as Record<string, unknown>;
    if (typeof r['tokenName'] !== 'string') throw new Error(`mocks[${i}] missing tokenName`);
    if (typeof r['operationId'] !== 'string') throw new Error(`mocks[${i}] missing operationId`);
    if (typeof r['path'] !== 'string') throw new Error(`mocks[${i}] missing path`);
    if (typeof r['method'] !== 'string') throw new Error(`mocks[${i}] missing method`);
    return {
      tokenName: r['tokenName'] as string,
      operationId: r['operationId'] as string,
      path: r['path'] as string,
      method: r['method'] as string,
      ...(typeof r['tag'] === 'string' ? { tag: r['tag'] as string } : {}),
    };
  });
  return { specId: obj['specId'] as string, mocks };
}

export function extractFromOpenApiSpec(
  spec: Record<string, unknown>,
): { mocks: ManifestMock[]; responseSchemas: Record<string, unknown> } {
  const mocks: ManifestMock[] = [];
  const responseSchemas: Record<string, unknown> = {};

  const rawComponents = (spec['components'] as Record<string, unknown> | undefined)?.['schemas'];
  const definitions = rawComponents
    ? (rewriteRefs(rawComponents) as Record<string, unknown>)
    : undefined;

  const paths = spec['paths'] as Record<string, unknown> | undefined;
  if (!paths) return { mocks, responseSchemas };

  const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue;
    for (const method of METHODS) {
      const op = (pathItem as Record<string, unknown>)[method];
      if (!op || typeof op !== 'object') continue;
      const opObj = op as Record<string, unknown>;
      const operationId = opObj['operationId'] as string | undefined;
      if (!operationId) continue;

      const tags = Array.isArray(opObj['tags']) ? (opObj['tags'] as string[]) : [];
      mocks.push({
        tokenName: toScreamingSnake(operationId),
        operationId,
        path,
        method,
        ...(tags[0] ? { tag: tags[0] } : {}),
      });

      const responses = opObj['responses'] as Record<string, unknown> | undefined;
      if (responses) {
        const statusCode = Object.keys(responses).find((k) => k.startsWith('2')) ?? '200';
        const resp = responses[statusCode] as Record<string, unknown> | undefined;
        const content = resp?.['content'] as Record<string, unknown> | undefined;
        const jsonContent = content?.['application/json'] as Record<string, unknown> | undefined;
        const rawSchema = jsonContent?.['schema'];
        if (rawSchema) {
          const schema = rewriteRefs(rawSchema) as Record<string, unknown>;
          responseSchemas[operationId] = definitions ? { ...schema, definitions } : schema;
        }
      }
    }
  }
  return { mocks, responseSchemas };
}

export function isOpenApiSpec(json: unknown): boolean {
  if (!json || typeof json !== 'object') return false;
  const obj = json as Record<string, unknown>;
  return typeof obj['openapi'] === 'string' && obj['openapi'].startsWith('3') && 'paths' in obj;
}

// ── Factory ────────────────────────────────────────────────────────────────────

function buildStore(
  specsSignal: ReturnType<typeof signal<Map<string, SpecEntry>>>,
  persist: (map: Map<string, SpecEntry>) => Promise<void>,
): SpecStore {
  const findMockComputed = computed(() => {
    const index = new Map<string, ManifestMock & { specId: string }>();
    for (const entry of specsSignal().values()) {
      for (const m of entry.mocks) {
        if (!index.has(m.tokenName)) index.set(m.tokenName, { ...m, specId: entry.specId });
      }
    }
    return (tokenName: string) => index.get(tokenName);
  });

  return {
    specs: specsSignal.asReadonly(),
    get findMock() { return findMockComputed(); },
    findSchema(specId: string, operationId: string): unknown {
      return specsSignal().get(specId)?.responseSchemas?.[operationId];
    },
    async addFromManifest(json: unknown): Promise<void> {
      const { specId, mocks } = parseManifest(json);
      specsSignal.update((prev) => {
        const next = new Map(prev);
        const existing = prev.get(specId);
        next.set(specId, {
          specId, mocks,
          addedAt: Date.now(),
          responseSchemas: existing?.responseSchemas,
        });
        return next;
      });
      await persist(specsSignal());
    },
    async addFromOpenApiSpec(json: unknown, specId: string): Promise<void> {
      const { mocks, responseSchemas } = extractFromOpenApiSpec(json as Record<string, unknown>);
      specsSignal.update((prev) => {
        const next = new Map(prev);
        next.set(specId, { specId, mocks, responseSchemas, addedAt: Date.now() });
        return next;
      });
      await persist(specsSignal());
    },
    async remove(specId: string): Promise<void> {
      specsSignal.update((prev) => {
        const next = new Map(prev);
        next.delete(specId);
        return next;
      });
      await persist(specsSignal());
    },
  };
}

export const SPEC_STORE = new InjectionToken<SpecStore>('SPEC_STORE', {
  providedIn: 'root',
  factory: () => {
    const specsSignal = signal<Map<string, SpecEntry>>(new Map());

    if (typeof chrome === 'undefined' || !chrome.storage) {
      return buildStore(specsSignal, async () => { /* noop */ });
    }

    async function persist(map: Map<string, SpecEntry>): Promise<void> {
      const obj: Record<string, SpecEntry> = {};
      for (const [k, v] of map) obj[k] = v;
      await chrome.storage.local.set({ [STORAGE_KEY]: obj });
    }

    chrome.storage.local.get(STORAGE_KEY, (result) => {
      const raw = result[STORAGE_KEY];
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        const map = new Map<string, SpecEntry>();
        for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
          map.set(k, v as SpecEntry);
        }
        specsSignal.set(map);
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes[STORAGE_KEY]) return;
      const nv = changes[STORAGE_KEY].newValue;
      if (nv && typeof nv === 'object' && !Array.isArray(nv)) {
        const map = new Map<string, SpecEntry>();
        for (const [k, v] of Object.entries(nv as Record<string, unknown>)) {
          map.set(k, v as SpecEntry);
        }
        specsSignal.set(map);
      } else {
        specsSignal.set(new Map());
      }
    });

    return buildStore(specsSignal, persist);
  },
});
