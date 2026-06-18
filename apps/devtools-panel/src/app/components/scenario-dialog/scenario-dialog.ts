import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { SCENARIO_STORE, Scenario } from '../../scenario-store.token';

@Component({
  selector: 'app-scenario-dialog',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTooltipModule],
  templateUrl: './scenario-dialog.html',
  styleUrl: './scenario-dialog.css',
})
export class ScenarioDialog {
  protected readonly store = inject(SCENARIO_STORE);
  protected readonly bridge = inject(MOCK_BRIDGE);
  protected readonly dialogRef = inject(MatDialogRef<ScenarioDialog>);

  protected readonly saveName = signal('');
  protected readonly feedback = signal<string | null>(null);
  protected readonly error = signal<string | null>(null);

  protected save(): void {
    const name = this.saveName().trim();
    if (!name) return;
    this.store.save(name, this.bridge.mocks());
    this.saveName.set('');
    this.feedback.set(`Saved "${name}"`);
    setTimeout(() => this.feedback.set(null), 2000);
  }

  protected load(scenario: Scenario): void {
    this.store.load(scenario);
    this.dialogRef.close();
  }

  protected remove(scenario: Scenario, event: MouseEvent): void {
    event.stopPropagation();
    this.store.remove(scenario.name);
  }

  protected async exportToClipboard(): Promise<void> {
    const json = this.store.exportJson(this.bridge.mocks());
    try {
      await navigator.clipboard.writeText(json);
      this.feedback.set('Copied to clipboard');
    } catch {
      this.downloadJson(json, 'mock-state.json');
      this.feedback.set('Downloaded mock-state.json');
    }
    setTimeout(() => this.feedback.set(null), 2500);
  }

  protected importFromFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        this.store.importJson(e.target!.result as string);
        this.feedback.set(`Applied ${file.name}`);
        this.error.set(null);
        setTimeout(() => this.feedback.set(null), 2500);
      } catch (err) {
        this.error.set(`Import failed: ${(err as Error).message}`);
      }
    };
    reader.readAsText(file);
    (event.target as HTMLInputElement).value = '';
  }

  protected formatDate(ts: number): string {
    return new Date(ts).toLocaleString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  }

  private downloadJson(json: string, filename: string): void {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
