import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { RespondTab } from './respond-tab';

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
