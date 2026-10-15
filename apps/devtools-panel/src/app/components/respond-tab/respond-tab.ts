import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { JsonEditorComponent } from '../json-editor/json-editor';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { SPEC_STORE } from '../../spec-store.token';
import { AI_MOCK_GENERATOR } from '../../ai/ai-mock-generator.token';
import { AI_SETTINGS } from '../../ai/ai-settings.token';
import { AiSettingsDialog } from '../ai-settings-dialog/ai-settings-dialog';

@Component({
  selector: 'app-respond-tab',
  imports: [MatButtonModule, MatToolbar, JsonEditorComponent],
  templateUrl: './respond-tab.html',
  styleUrl: './respond-tab.css',
})
export class RespondTab {
  protected readonly bridge = inject(MOCK_BRIDGE);
  protected readonly specStore = inject(SPEC_STORE);
  private readonly aiGenerator = inject(AI_MOCK_GENERATOR);
  protected readonly aiSettings = inject(AI_SETTINGS);
  private readonly dialog = inject(MatDialog);
  private aiAbort: AbortController | null = null;

  protected readonly json = signal('');
  protected readonly delay = signal('');
  protected readonly jsonError = signal<string | null>(null);
  protected readonly schemaExpanded = signal(false);
  protected readonly validationErrors = signal<string[] | null>(null);
  protected readonly generateLoading = signal(false);
  protected readonly validateLoading = signal(false);
  protected readonly aiPrompt = signal('');
  protected readonly aiUseCurrent = signal(false);
  protected readonly aiLoading = signal(false);
  protected readonly aiStatus = signal<string | null>(null);

  protected readonly selectedEntry = this.bridge.selectedEntry;

  protected readonly pendingArgsJson = computed(() => {
    const entry = this.selectedEntry();
    if (!entry?.pendingRequest?.args.length) return null;
    const args = entry.pendingRequest.args;
    const val = args.length === 1 ? args[0] : args;
    try { return JSON.stringify(val, null, 2); } catch { return String(val); }
  });

  protected readonly schema = computed(() => {
    const entry = this.selectedEntry();
    if (!entry?.meta) return null;
    return this.specStore.findSchema(entry.meta.specId, entry.meta.operationId) ?? null;
  });

  protected readonly hasExample = computed(() => {
    const entry = this.selectedEntry();
    if (!entry?.meta) return false;
    return this.specStore.findExample(entry.meta.specId, entry.meta.operationId) !== undefined;
  });

  protected readonly schemaJson = computed(() => {
    const s = this.schema();
    if (!s) return '';
    try { return JSON.stringify(s, null, 2); } catch { return ''; }
  });

  constructor() {
    effect(() => {
      const key = this.bridge.selectedKey();
      const entry = untracked(() => (key ? this.bridge.mocks().get(key) : null));
      const start = entry?.state.value ?? entry?.example;
      this.json.set(start !== undefined ? JSON.stringify(start, null, 2) : '');
      this.jsonError.set(null);
      this.validationErrors.set(null);
      this.schemaExpanded.set(false);
    });

    // A value that arrives while the mock is selected — typically the real API's response to a
    // request that was not mocked — becomes the starting point, as long as nothing was typed yet.
    effect(() => {
      const entry = this.selectedEntry();
      const value = entry?.state.value ?? entry?.example;
      if (value === undefined) return;
      untracked(() => {
        if (this.json().trim() === '') this.json.set(JSON.stringify(value, null, 2));
      });
    });
  }

  protected onEditorChange(value: string): void {
    this.json.set(value);
    this.validationErrors.set(null);
  }

  protected useExample(): void {
    const entry = this.selectedEntry();
    if (!entry?.meta) return;
    const ex = this.specStore.findExample(entry.meta.specId, entry.meta.operationId);
    if (ex === undefined) return;
    this.json.set(JSON.stringify(ex, null, 2));
    this.jsonError.set(null);
    this.validationErrors.set(null);
  }

  protected resolve(): void {
    const key = this.bridge.selectedKey();
    if (!key || this.jsonError()) return;
    const jsonStr = this.json().trim();
    const value = jsonStr ? JSON.parse(jsonStr) : undefined;
    const ms = parseInt(this.delay(), 10);
    if (!isNaN(ms) && ms > 0) {
      this.bridge.sendControl(key, 'resolveAfter', { delayMs: ms, value });
    } else {
      this.bridge.sendControl(key, 'resolve', { value });
    }
  }

  protected fail(): void {
    const key = this.bridge.selectedKey();
    if (!key) return;
    let error: unknown = 'Error';
    const jsonStr = this.json().trim();
    if (jsonStr && !this.jsonError()) {
      try { error = JSON.parse(jsonStr); } catch { /* keep default */ }
    }
    this.bridge.sendControl(key, 'fail', { value: error });
  }

  protected async generateExample(): Promise<void> {
    const schema = this.schema();
    if (!schema) return;
    this.generateLoading.set(true);
    this.validationErrors.set(null);
    try {
      const { generate } = await import('json-schema-faker');
      const example = await generate(schema as Parameters<typeof generate>[0]);
      this.json.set(JSON.stringify(example, null, 2));
      this.jsonError.set(null);
    } catch (e) {
      this.jsonError.set((e as Error).message);
    } finally {
      this.generateLoading.set(false);
    }
  }

  protected openAiSettings(): void {
    this.dialog.open(AiSettingsDialog, { autoFocus: false });
  }

  protected cancelAi(): void {
    this.aiAbort?.abort();
  }

  protected async generateWithAi(): Promise<void> {
    const schema = this.schema();
    const entry = this.selectedEntry();
    if (!schema || this.aiLoading()) return;

    let example: unknown;
    if (this.aiUseCurrent() && this.json().trim() && !this.jsonError()) {
      try { example = JSON.parse(this.json()); } catch { /* not valid yet: send no example */ }
    }

    const abort = (this.aiAbort = new AbortController());
    this.aiLoading.set(true);
    this.validationErrors.set(null);
    this.aiStatus.set('Asking the model…');
    try {
      const result = await this.aiGenerator.generate({
        schema,
        prompt: this.aiPrompt(),
        example,
        operation: entry?.meta ? `${entry.meta.method.toUpperCase()} ${entry.meta.path}` : undefined,
        signal: abort.signal,
        onAttempt: (n) => this.aiStatus.set(n === 1 ? 'Asking the model…' : `Fixing schema errors (attempt ${n})…`),
      });
      this.json.set(JSON.stringify(result.value, null, 2));
      this.jsonError.set(null);
      this.validationErrors.set(result.errors);
      this.aiStatus.set(null);
    } catch (e) {
      this.aiStatus.set(abort.signal.aborted ? 'Cancelled' : (e as Error).message);
    } finally {
      this.aiLoading.set(false);
      this.aiAbort = null;
    }
  }

  protected async validateJson(): Promise<void> {
    const schema = this.schema();
    const jsonStr = this.json().trim();
    if (!schema || !jsonStr || this.jsonError()) return;
    this.validateLoading.set(true);
    try {
      const { Validator } = await import('@cfworker/json-schema');
      const result = new Validator(schema).validate(JSON.parse(jsonStr));
      this.validationErrors.set(
        result.valid
          ? []
          : result.errors.map((e) => `${e.instanceLocation || '(root)'} ${e.error ?? 'invalid'}`),
      );
    } catch (e) {
      this.validationErrors.set([(e as Error).message]);
    } finally {
      this.validateLoading.set(false);
    }
  }
}
