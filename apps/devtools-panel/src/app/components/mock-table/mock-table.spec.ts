import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { MockTable } from './mock-table';

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

describe('MockTable', () => {
  let component: MockTable;
  let fixture: ComponentFixture<MockTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockTable],
      providers: [{ provide: MOCK_BRIDGE, useValue: mockBridge }],
    }).compileComponents();

    fixture = TestBed.createComponent(MockTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
