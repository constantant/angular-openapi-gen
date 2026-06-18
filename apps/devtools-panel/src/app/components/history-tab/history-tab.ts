import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import type { HistoryEvent } from '../../mock-entry';
import type { MockResourceMeta } from '../../mock-entry';

type SectionType = 'json' | 'string' | 'header';

interface DetailSection {
  label: string;
  json: string;
  type: SectionType;
}

const BINARY_RE = /^\[(FormData|Blob|ArrayBuffer|File:)/;

function extractPathParamNames(path: string): string[] {
  return [...path.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
}

function fillPath(path: string, args: unknown[]): string {
  let i = 0;
  return path.replace(/\{[^}]+\}/g, () => String(args[i++] ?? '?'));
}

function formatArgValue(arg: unknown): { text: string; type: 'json' | 'string' } {
  if (typeof arg === 'string' && BINARY_RE.test(arg)) return { text: arg, type: 'string' };
  return { text: JSON.stringify(arg, null, 2), type: 'json' };
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

  protected preview(ev: HistoryEvent, meta: MockResourceMeta | null): string {
    if ((ev.type === 'request' || ev.type === 'caught') && ev.args?.length && meta) {
      const paramNames = extractPathParamNames(meta.path);
      const pathArgs = ev.args.slice(0, paramNames.length);
      return `${meta.method.toUpperCase()} ${fillPath(meta.path, pathArgs)}`;
    }
    const val = ev.error !== undefined ? ev.error : ev.value ?? ev.args?.[0];
    if (val === undefined) return '';
    const s = JSON.stringify(val);
    return s.length > 60 ? s.slice(0, 60) + '…' : s;
  }

  protected hasPayload(ev: HistoryEvent): boolean {
    return ev.value !== undefined || ev.error !== undefined || !!ev.args?.length;
  }

  protected payloadSections(ev: HistoryEvent, meta: MockResourceMeta | null): DetailSection[] {
    const sections: DetailSection[] = [];

    if (ev.args?.length) {
      if (meta) {
        const paramNames = extractPathParamNames(meta.path);
        const pathArgs = ev.args.slice(0, paramNames.length);
        const rest = ev.args.slice(paramNames.length);

        sections.push({
          label: `${meta.method.toUpperCase()} ${fillPath(meta.path, pathArgs)}`,
          json: '',
          type: 'header',
        });

        for (let i = 0; i < paramNames.length; i++) {
          const { text, type } = formatArgValue(ev.args[i]);
          sections.push({ label: paramNames[i], json: text, type });
        }

        if (rest.length) {
          const isBody = ['post', 'put', 'patch'].includes(meta.method);
          const baseLabel = isBody ? 'Body' : 'Query';
          rest.forEach((arg, idx) => {
            const { text, type } = formatArgValue(arg);
            const label = rest.length > 1 ? `${baseLabel} [${idx}]` : baseLabel;
            sections.push({ label, json: text, type });
          });
        }
      } else {
        const val = ev.args.length === 1 ? ev.args[0] : ev.args;
        const { text, type } = formatArgValue(val);
        sections.push({ label: 'Request', json: text, type });
      }
    }

    if (ev.value !== undefined) {
      sections.push({ label: 'Response', json: JSON.stringify(ev.value, null, 2), type: 'json' });
    }
    if (ev.error !== undefined) {
      sections.push({ label: 'Error', json: JSON.stringify(ev.error, null, 2), type: 'json' });
    }
    return sections;
  }

  protected toggleExpand(ev: HistoryEvent): void {
    if (!this.hasPayload(ev)) return;
    this.expandedId.update(id => id === ev.id ? null : ev.id);
  }
}
