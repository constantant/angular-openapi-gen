import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { SPEC_STORE, toScreamingSnake, ManifestMock, SpecEntry } from '../../spec-store.token';

@Component({
  selector: 'app-create-mock-dialog',
  imports: [MatButtonModule, MatDialogModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatTooltipModule],
  templateUrl: './create-mock-dialog.html',
  styleUrl: './create-mock-dialog.css',
})
export class CreateMockDialog {
  protected readonly specStore = inject(SPEC_STORE);
  protected readonly bridge = inject(MOCK_BRIDGE);
  protected readonly dialogRef = inject(MatDialogRef<CreateMockDialog>);

  protected readonly specList = computed<SpecEntry[]>(() => [...this.specStore.specs().values()]);

  protected readonly selectedSpecId = signal<string | null>(null);
  protected readonly operationFilter = signal('');
  protected readonly selectedMock = signal<ManifestMock | null>(null);
  protected readonly keyInput = signal('');

  protected readonly effectiveSpecId = computed<string | null>(() => {
    const explicit = this.selectedSpecId();
    if (explicit) return explicit;
    const list = this.specList();
    return list.length > 0 ? list[0].specId : null;
  });

  protected readonly filteredMocks = computed<ManifestMock[]>(() => {
    const specId = this.effectiveSpecId();
    if (!specId) return [];
    const entry = this.specStore.specs().get(specId);
    if (!entry) return [];
    const f = this.operationFilter().toLowerCase();
    if (!f) return entry.mocks;
    return entry.mocks.filter(
      (m) => m.operationId.toLowerCase().includes(f) || m.path.toLowerCase().includes(f) || m.method.toLowerCase().includes(f),
    );
  });

  protected readonly keyConflict = computed(() => {
    const k = this.keyInput().trim();
    return k !== '' && this.bridge.mocks().has(k);
  });

  protected readonly canCreate = computed(() => {
    const mock = this.selectedMock();
    const key = this.keyInput().trim();
    return mock !== null && key !== '' && !this.keyConflict();
  });

  protected selectOperation(mock: ManifestMock): void {
    this.selectedMock.set(mock);
    this.keyInput.set(toScreamingSnake(mock.operationId));
  }

  protected onSpecChange(specId: string): void {
    this.selectedSpecId.set(specId);
    this.selectedMock.set(null);
    this.keyInput.set('');
    this.operationFilter.set('');
  }

  protected create(): void {
    const mock = this.selectedMock();
    const key = this.keyInput().trim();
    const specId = this.effectiveSpecId();
    if (!mock || !key || !specId) return;
    this.bridge.createLocalMock(key, {
      specId,
      operationId: mock.operationId,
      path: mock.path,
      method: mock.method,
      ...(mock.tag ? { tag: mock.tag } : {}),
    });
    this.dialogRef.close();
  }
}
