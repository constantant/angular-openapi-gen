import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MOCK_BRIDGE } from './mock-bridge.token';
import { MockTable } from './components/mock-table/mock-table';
import { RespondTab } from './components/respond-tab/respond-tab';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MockTable,
    RespondTab,
  ],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected readonly bridge = inject(MOCK_BRIDGE);
  protected readonly filter = signal('');

  protected readonly mockCount = computed(() => this.bridge.mocks().size);
  protected readonly selectedEntry = computed(() => {
    const key = this.bridge.selectedKey();
    return key ? (this.bridge.mocks().get(key) ?? null) : null;
  });
}
