import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { App } from './app';
import { MOCK_BRIDGE } from './mock-bridge.token';

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

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: MOCK_BRIDGE, useValue: mockBridge }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
