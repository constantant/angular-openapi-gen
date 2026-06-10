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
}

export interface SpecStore {
  readonly specs: Signal<ReadonlyMap<string, SpecEntry>>;
  /** Look up a ManifestMock by tokenName across all registered specs. */
  readonly findMock: (tokenName: string) => ManifestMock & { specId: string } | undefined;
  addFromManifest(json: unknown): Promise<void>;
  remove(specId: string): Promise<void>;
}

const STORAGE_KEY = 'oarm_specs';

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

function buildStore(
  specsSignal: ReturnType<typeof signal<Map<string, SpecEntry>>>,
  persist: (map: Map<string, SpecEntry>) => Promise<void>,
): SpecStore {
  const findMock = computed(() => {
    const index = new Map<string, ManifestMock & { specId: string }>();
    for (const entry of specsSignal().values()) {
      for (const m of entry.mocks) {
        if (!index.has(m.tokenName)) {
          index.set(m.tokenName, { ...m, specId: entry.specId });
        }
      }
    }
    return (tokenName: string) => index.get(tokenName);
  });

  return {
    specs: specsSignal.asReadonly(),
    get findMock() { return findMock(); },
    async addFromManifest(json: unknown): Promise<void> {
      const { specId, mocks } = parseManifest(json);
      specsSignal.update((prev) => {
        const next = new Map(prev);
        next.set(specId, { specId, mocks, addedAt: Date.now() });
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

    // Load persisted entries on init
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

    // Keep in sync if another panel modifies storage
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
