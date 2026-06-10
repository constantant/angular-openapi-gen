import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MOCK_BRIDGE } from './mock-bridge.token';
import { MockTable } from './components/mock-table/mock-table';
import { RespondTab } from './components/respond-tab/respond-tab';
import { HistoryTab } from './components/history-tab/history-tab';
import { SpecsTab } from './components/specs-tab/specs-tab';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabNav, MatTabLink, MatTabNavPanel,
    MatTooltipModule,
    MockTable,
    RespondTab,
    HistoryTab,
    SpecsTab,
  ],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected readonly bridge = inject(MOCK_BRIDGE);
  protected readonly filter = signal('');
  protected readonly page = signal<'mocks' | 'specs'>('mocks');
  protected readonly rightTab = signal<'respond' | 'history'>('respond');

  protected readonly mockCount = computed(() => this.bridge.mocks().size);
  protected readonly selectedEntry = computed(() => {
    const key = this.bridge.selectedKey();
    return key ? (this.bridge.mocks().get(key) ?? null) : null;
  });

  protected readonly catchAllActive = computed(() => {
    const m = this.bridge.mocks();
    return m.size > 0 && [...m.values()].every((e) => e.catchMode);
  });

  protected toggleCatchAll(): void {
    const enable = !this.catchAllActive();
    for (const key of this.bridge.mocks().keys()) {
      this.bridge.setCatchMode(key, enable);
    }
  }
}
