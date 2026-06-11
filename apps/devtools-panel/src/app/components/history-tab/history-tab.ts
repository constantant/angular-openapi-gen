import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import type { HistoryEvent } from '../../mock-entry';

interface DetailSection {
  label: string;
  json: string;
}

@Component({
  selector: 'app-history-tab',
  imports: [MatButtonModule, MatToolbar],
  templateUrl: './history-tab.html',
  styleUrl: './history-tab.css',
})
export class HistoryTab {
  protected readonly bridge = inject(MOCK_BRIDGE);
  protected readonly expandedId = signal<number | null>(null);

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
    const val = ev.error !== undefined ? ev.error : ev.value ?? ev.args?.[0];
    if (val === undefined) return '';
    const s = JSON.stringify(val);
    return s.length > 60 ? s.slice(0, 60) + '…' : s;
  }

  protected hasPayload(ev: HistoryEvent): boolean {
    return ev.value !== undefined || ev.error !== undefined || !!ev.args?.length;
  }

  protected payloadSections(ev: HistoryEvent): DetailSection[] {
    const sections: DetailSection[] = [];
    if (ev.args?.length) {
      const val = ev.args.length === 1 ? ev.args[0] : ev.args;
      sections.push({ label: 'Request', json: JSON.stringify(val, null, 2) });
    }
    if (ev.value !== undefined) {
      sections.push({ label: 'Response', json: JSON.stringify(ev.value, null, 2) });
    }
    if (ev.error !== undefined) {
      sections.push({ label: 'Error', json: JSON.stringify(ev.error, null, 2) });
    }
    return sections;
  }

  protected toggleExpand(ev: HistoryEvent): void {
    if (!this.hasPayload(ev)) return;
    this.expandedId.update(id => id === ev.id ? null : ev.id);
  }
}
