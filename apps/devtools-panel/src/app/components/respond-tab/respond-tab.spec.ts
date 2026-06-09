import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { RespondTab } from './respond-tab';

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

describe('RespondTab', () => {
  let component: RespondTab;
  let fixture: ComponentFixture<RespondTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespondTab],
      providers: [{ provide: MOCK_BRIDGE, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(RespondTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
