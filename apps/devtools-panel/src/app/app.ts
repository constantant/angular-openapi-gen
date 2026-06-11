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

const PANEL_WIDTH_KEY = 'oarm_right_panel_width';
const MIN_WIDTH = 200;
const MAX_WIDTH = 720;
const DEFAULT_WIDTH = 320;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

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
  protected readonly rightPanelWidth = signal(
    clamp(Number(localStorage.getItem(PANEL_WIDTH_KEY)) || DEFAULT_WIDTH, MIN_WIDTH, MAX_WIDTH),
  );

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

  protected startResize(e: PointerEvent): void {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = this.rightPanelWidth();

    const onMove = (ev: PointerEvent) => {
      const width = clamp(startWidth + (startX - ev.clientX), MIN_WIDTH, MAX_WIDTH);
      this.rightPanelWidth.set(width);
    };

    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      localStorage.setItem(PANEL_WIDTH_KEY, String(this.rightPanelWidth()));
    };

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }
}
