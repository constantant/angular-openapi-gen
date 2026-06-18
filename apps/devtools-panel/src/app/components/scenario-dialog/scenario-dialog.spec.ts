import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { vi } from 'vitest';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { SCENARIO_STORE } from '../../scenario-store.token';
import { ScenarioDialog } from './scenario-dialog';

const mockBridge = {
  mocks: signal(new Map()),
  selectedKey: signal(null),
  sendControl: vi.fn(),
  setCatchMode: vi.fn(),
  refresh: vi.fn(),
  clearAll: vi.fn(),
  resetAll: vi.fn(),
  clearHistory: vi.fn(),
};

const mockStore = {
  scenarios: signal([]),
  save: vi.fn(),
  load: vi.fn(),
  remove: vi.fn(),
  exportJson: vi.fn(() => '{}'),
  importJson: vi.fn(),
};

const mockDialogRef = { close: vi.fn() };

describe('ScenarioDialog', () => {
  let component: ScenarioDialog;
  let fixture: ComponentFixture<ScenarioDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioDialog],
      providers: [
        { provide: MOCK_BRIDGE, useValue: mockBridge },
        { provide: SCENARIO_STORE, useValue: mockStore },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
