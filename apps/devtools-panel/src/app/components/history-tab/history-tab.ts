import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import type { HistoryEvent } from '../../mock-entry';

@Component({
  selector: 'app-history-tab',
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './history-tab.html',
  styleUrl: './history-tab.css',
})
export class HistoryTab {
  protected readonly bridge = inject(MOCK_BRIDGE);

  protected readonly selectedEntry = computed(() => {
    const key = this.bridge.selectedKey();
    return key ? (this.bridge.mocks().get(key) ?? null) : null;
  });

  protected timestamp(ts: number): string {
    const d = new Date(ts);
    return d.toLocaleTimeString('en', { hour12: false }) +
      '.' + String(d.getMilliseconds()).padStart(3, '0');
  }

  protected preview(ev: HistoryEvent): string {
    const val = ev.error !== undefined ? ev.error : ev.value;
    if (val === undefined) return '';
    const s = JSON.stringify(val);
    return s.length > 60 ? s.slice(0, 60) + '…' : s;
  }
}
