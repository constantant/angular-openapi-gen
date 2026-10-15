import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AI_SETTINGS } from '../../ai/ai-settings.token';
import { AiProviderId, AiSettings } from '../../ai/ai-types';
import { chromeAvailability } from '../../ai/providers';

@Component({
  selector: 'app-ai-settings-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './ai-settings-dialog.html',
  styleUrl: './ai-settings-dialog.css',
})
export class AiSettingsDialog {
  protected readonly store = inject(AI_SETTINGS);
  protected readonly chromeState = signal('checking…');

  protected readonly providers: {
    id: AiProviderId;
    label: string;
    hint: string;
  }[] = [
    {
      id: 'anthropic',
      label: 'Anthropic API',
      hint: 'Best quality. The schema (and, if you opt in, your JSON) is sent to api.anthropic.com.',
    },
    {
      id: 'chrome',
      label: 'Chrome built-in AI',
      hint: 'Gemini Nano runs on this device. Free and private; weaker on large schemas.',
    },
    {
      id: 'ollama',
      label: 'Ollama (local)',
      hint: 'Runs on your machine. Start Ollama with OLLAMA_ORIGINS="chrome-extension://*".',
    },
  ];

  constructor() {
    void chromeAvailability().then((s) => this.chromeState.set(s));
  }

  protected set(key: keyof AiSettings, event: Event): void {
    this.store.update({ [key]: (event.target as HTMLInputElement).value });
  }
}
