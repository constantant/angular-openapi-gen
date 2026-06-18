import { InjectionToken, Signal, inject, signal } from '@angular/core';
import { MOCK_BRIDGE } from './mock-bridge.token';
import type { MockEntry } from './mock-entry';

export interface ScenarioMock {
  key: string;
  value?: unknown;
  catchMode: boolean;
}

export interface Scenario {
  name: string;
  savedAt: number;
  mocks: ScenarioMock[];
}

export interface ScenarioStore {
  readonly scenarios: Signal<Scenario[]>;
  save(name: string, mocks: ReadonlyMap<string, MockEntry>): void;
  load(scenario: Scenario): void;
  remove(name: string): void;
  exportJson(mocks: ReadonlyMap<string, MockEntry>): string;
  importJson(json: string): void;
}

const STORAGE_KEY = 'oarm_scenarios';

function snapshotMocks(mocks: ReadonlyMap<string, MockEntry>): ScenarioMock[] {
  return [...mocks.values()].map((e) => ({
    key: e.key,
    ...(e.state.value !== undefined ? { value: e.state.value } : {}),
    catchMode: e.catchMode,
  }));
}

export const SCENARIO_STORE = new InjectionToken<ScenarioStore>('SCENARIO_STORE', {
  providedIn: 'root',
  factory: () => {
    const bridge = inject(MOCK_BRIDGE);
    const scenarios = signal<Scenario[]>([]);
    const isChrome = typeof chrome !== 'undefined' && !!chrome.storage;

    function persist(list: Scenario[]): void {
      if (!isChrome) return;
      const record: Record<string, Scenario> = {};
      for (const s of list) record[s.name] = s;
      chrome.storage.local.set({ [STORAGE_KEY]: record });
    }

    if (isChrome) {
      chrome.storage.local.get(STORAGE_KEY, (res) => {
        const stored = res[STORAGE_KEY];
        if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
          scenarios.set(
            Object.values(stored as Record<string, Scenario>).sort(
              (a, b) => b.savedAt - a.savedAt,
            ),
          );
        }
      });
    }

    function applyScenario(scenario: Scenario): void {
      for (const m of scenario.mocks) {
        if (typeof m?.key !== 'string') continue;
        if (!bridge.mocks().has(m.key)) continue;
        if (m.value !== undefined) {
          bridge.sendControl(m.key, 'resolve', { value: m.value });
        }
        const current = bridge.mocks().get(m.key);
        if (current && current.catchMode !== m.catchMode) {
          bridge.setCatchMode(m.key, m.catchMode);
        }
      }
    }

    return {
      scenarios: scenarios.asReadonly(),

      save(name: string, mocks: ReadonlyMap<string, MockEntry>): void {
        const scenario: Scenario = { name, savedAt: Date.now(), mocks: snapshotMocks(mocks) };
        scenarios.update((list) => [scenario, ...list.filter((s) => s.name !== name)]);
        persist(scenarios());
      },

      load(scenario: Scenario): void {
        applyScenario(scenario);
      },

      remove(name: string): void {
        scenarios.update((list) => list.filter((s) => s.name !== name));
        persist(scenarios());
      },

      exportJson(mocks: ReadonlyMap<string, MockEntry>): string {
        const scenario: Scenario = { name: 'export', savedAt: Date.now(), mocks: snapshotMocks(mocks) };
        return JSON.stringify(scenario, null, 2);
      },

      importJson(json: string): void {
        const parsed = JSON.parse(json) as { mocks?: unknown };
        if (!parsed || !Array.isArray(parsed.mocks)) {
          throw new Error('Invalid format: expected { mocks: [...] }');
        }
        applyScenario(parsed as Scenario);
      },
    };
  },
});
