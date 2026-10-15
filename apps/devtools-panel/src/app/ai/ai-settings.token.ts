import { InjectionToken, Signal, signal } from '@angular/core';
import { AiSettings, DEFAULT_AI_SETTINGS } from './ai-types';

export interface AiSettingsStore {
  readonly settings: Signal<AiSettings>;
  update(patch: Partial<AiSettings>): void;
}

const STORAGE_KEY = 'oarm_ai_settings';

export const AI_SETTINGS = new InjectionToken<AiSettingsStore>('AI_SETTINGS', {
  providedIn: 'root',
  factory: () => {
    const settings = signal<AiSettings>({ ...DEFAULT_AI_SETTINGS });
    const isChrome = typeof chrome !== 'undefined' && !!chrome.storage;

    if (isChrome) {
      chrome.storage.local.get(STORAGE_KEY, (res) => {
        const stored = res[STORAGE_KEY];
        if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
          settings.set({
            ...DEFAULT_AI_SETTINGS,
            ...(stored as Partial<AiSettings>),
          });
        }
      });
    }

    return {
      settings: settings.asReadonly(),
      update(patch: Partial<AiSettings>): void {
        settings.update((s) => ({ ...s, ...patch }));
        if (isChrome) chrome.storage.local.set({ [STORAGE_KEY]: settings() });
      },
    };
  },
});
