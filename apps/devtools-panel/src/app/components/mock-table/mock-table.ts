import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import type { MockEntry } from '../../mock-entry';

@Component({
  selector: 'app-mock-table',
  imports: [MatTableModule, MatButtonModule, MatTooltipModule],
  templateUrl: './mock-table.html',
  styleUrl: './mock-table.css',
})
export class MockTable {
  protected readonly bridge = inject(MOCK_BRIDGE);
  readonly filter = input<string>('');

  protected readonly entries = computed<MockEntry[]>(() => {
    const f = this.filter().toLowerCase();
    return [...this.bridge.mocks().values()].filter(
      (e) => !f || e.key.toLowerCase().includes(f),
    );
  });

  protected readonly cols = ['key', 'status', 'lastEvent', 'actions'];

  protected ago(ts: number): string {
    const ms = Date.now() - ts;
    if (ms < 1000) return `${ms}ms ago`;
    if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s ago`;
    return `${Math.floor(ms / 60_000)}m ago`;
  }
}
