import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { MOCK_BRIDGE } from '../../mock-bridge.token';

@Component({
  selector: 'app-respond-tab',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbar],
  templateUrl: './respond-tab.html',
  styleUrl: './respond-tab.css',
})
export class RespondTab {
  protected readonly bridge = inject(MOCK_BRIDGE);

  protected readonly json = signal('');
  protected readonly delay = signal('');
  protected readonly jsonError = signal<string | null>(null);

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

  constructor() {
    // Re-populate the JSON editor only when the selected KEY changes,
    // not on every value update (so in-progress edits aren't overwritten).
    effect(() => {
      const key = this.bridge.selectedKey();
      const entry = untracked(() => (key ? this.bridge.mocks().get(key) : null));
      this.json.set(
        entry?.state.value !== undefined
          ? JSON.stringify(entry.state.value, null, 2)
          : '',
      );
      this.jsonError.set(null);
    });
  }

  protected onJsonInput(value: string): void {
    this.json.set(value);
    if (!value.trim()) { this.jsonError.set(null); return; }
    try { JSON.parse(value); this.jsonError.set(null); }
    catch (e) { this.jsonError.set(e instanceof Error ? e.message : 'Invalid JSON'); }
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
}
