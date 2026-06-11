import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { JsonEditorComponent } from '../json-editor/json-editor';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { SPEC_STORE } from '../../spec-store.token';

@Component({
  selector: 'app-respond-tab',
  imports: [MatButtonModule, MatToolbar, JsonEditorComponent],
  templateUrl: './respond-tab.html',
  styleUrl: './respond-tab.css',
})
export class RespondTab {
  protected readonly bridge = inject(MOCK_BRIDGE);
  protected readonly specStore = inject(SPEC_STORE);

  protected readonly json = signal('');
  protected readonly delay = signal('');
  protected readonly jsonError = signal<string | null>(null);
  protected readonly schemaExpanded = signal(false);
  protected readonly validationErrors = signal<string[] | null>(null);
  protected readonly generateLoading = signal(false);
  protected readonly validateLoading = signal(false);

  protected readonly selectedEntry = computed(() => {
    const key = this.bridge.selectedKey();
    return key ? (this.bridge.mocks().get(key) ?? null) : null;
  });

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
      this.json.set(
        entry?.state.value !== undefined
          ? JSON.stringify(entry.state.value, null, 2)
          : '',
      );
      this.jsonError.set(null);
      this.validationErrors.set(null);
      this.schemaExpanded.set(false);
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

  protected async validateJson(): Promise<void> {
    const schema = this.schema();
    const jsonStr = this.json().trim();
    if (!schema || !jsonStr || this.jsonError()) return;
    this.validateLoading.set(true);
    try {
      const { default: Ajv } = await import('ajv');
      const ajv = new Ajv({ strict: false, allErrors: true });
      const validate = ajv.compile(schema);
      const valid = validate(JSON.parse(jsonStr));
      this.validationErrors.set(
        valid
          ? []
          : (validate.errors ?? []).map(
              (e) => `${e.instancePath || '(root)'} ${e.message ?? 'invalid'}`,
            ),
      );
    } catch (e) {
      this.validationErrors.set([(e as Error).message]);
    } finally {
      this.validateLoading.set(false);
    }
  }
}
