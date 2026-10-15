import { TestBed } from '@angular/core/testing';
import { AI_SETTINGS } from '../../ai/ai-settings.token';
import { AiSettingsDialog } from './ai-settings-dialog';

describe('AiSettingsDialog', () => {
  it('writes the chosen provider to the settings store', async () => {
    await TestBed.configureTestingModule({
      imports: [AiSettingsDialog],
    }).compileComponents();
    const fixture = TestBed.createComponent(AiSettingsDialog);
    await fixture.whenStable();

    const radios = fixture.nativeElement.querySelectorAll(
      'input[type=radio]',
    ) as NodeListOf<HTMLInputElement>;
    expect(radios.length).toBe(3);
    radios[2].dispatchEvent(new Event('change'));

    expect(TestBed.inject(AI_SETTINGS).settings().provider).toBe('ollama');
  });
});
