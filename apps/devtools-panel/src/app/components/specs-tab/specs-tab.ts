import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SPEC_STORE, SpecEntry } from '../../spec-store.token';

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
        const text = await file.text();
        await this.store.addFromManifest(JSON.parse(text));
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
      await this.store.addFromManifest(await res.json());
      this.urlInput.set('');
      this.urlMode.set(false);
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.loading.set(false);
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
}
