import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SPEC_STORE, SpecEntry, extractFromOpenApiSpec, isOpenApiSpec } from '../../spec-store.token';

interface PendingSpec {
  specId: string;
  json: unknown;
  mockCount: number;
  schemaCount: number;
}

@Component({
  selector: 'app-specs-tab',
  imports: [MatButtonModule],
  templateUrl: './specs-tab.html',
  styleUrl: './specs-tab.css',
})
export class SpecsTab {
  protected readonly store = inject(SPEC_STORE);
  protected readonly urlMode = signal(false);
  protected readonly urlInput = signal('');
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly pendingSpec = signal<PendingSpec | null>(null);

  protected readonly specList = computed<SpecEntry[]>(() => [...this.store.specs().values()]);

  protected openFilePicker(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      this.error.set(null);
      try {
        const json = JSON.parse(await file.text());
        await this.handleJson(json);
      } catch (e) {
        this.error.set((e as Error).message);
      }
    };
    input.click();
  }

  protected toggleUrlMode(): void {
    this.urlMode.update((v) => !v);
    this.error.set(null);
  }

  protected async fetchFromUrl(): Promise<void> {
    const url = this.urlInput().trim();
    if (!url) return;
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      await this.handleJson(await res.json());
      this.urlInput.set('');
      this.urlMode.set(false);
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.loading.set(false);
    }
  }

  private async handleJson(json: unknown): Promise<void> {
    if (isOpenApiSpec(json)) {
      const spec = json as Record<string, unknown>;
      const { mocks, responseSchemas } = extractFromOpenApiSpec(spec);
      const title = ((spec['info'] as Record<string, unknown> | undefined)?.['title'] as string) ?? '';
      const defaultId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'api';
      this.pendingSpec.set({
        specId: defaultId,
        json,
        mockCount: mocks.length,
        schemaCount: Object.keys(responseSchemas).length,
      });
    } else {
      await this.store.addFromManifest(json);
    }
  }

  protected updatePendingSpecId(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    const p = this.pendingSpec();
    if (p) this.pendingSpec.set({ ...p, specId: val });
  }

  protected async confirmImport(): Promise<void> {
    const p = this.pendingSpec();
    if (!p?.specId.trim()) return;
    this.error.set(null);
    try {
      await this.store.addFromOpenApiSpec(p.json, p.specId.trim());
      this.pendingSpec.set(null);
    } catch (e) {
      this.error.set((e as Error).message);
    }
  }

  protected remove(specId: string): void {
    void this.store.remove(specId);
  }

  protected formatDate(ts: number): string {
    return new Date(ts).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  }

  protected objectKeys(obj: Record<string, unknown>): string[] {
    return Object.keys(obj);
  }
}
