import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { HistoryTab } from './history-tab';

const mockBridge = {
  mocks: signal(new Map()),
  selectedKey: signal(null),
  sendControl: () => {},
  setCatchMode: () => {},
  refresh: () => {},
  clearAll: () => {},
  resetAll: () => {},
  clearHistory: () => {},
};

describe('HistoryTab', () => {
  let component: HistoryTab;
  let fixture: ComponentFixture<HistoryTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTab],
      providers: [{ provide: MOCK_BRIDGE, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
