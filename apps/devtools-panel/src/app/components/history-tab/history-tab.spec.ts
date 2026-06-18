import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import { MOCK_BRIDGE } from '../../mock-bridge.token';
import { HistoryTab } from './history-tab';
import type { MockResourceMeta } from '../../mock-entry';

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

const GET_META: MockResourceMeta = { specId: 'pets', operationId: 'getPetById', path: '/pet/{petId}', method: 'get' };
const POST_META: MockResourceMeta = { specId: 'pets', operationId: 'addPet', path: '/pet', method: 'post' };
const QUERY_META: MockResourceMeta = { specId: 'pets', operationId: 'findPets', path: '/pet/findByStatus', method: 'get' };

type Comp = { payloadSections: (ev: object, meta: MockResourceMeta | null) => { label: string; json: string; type: string }[]; preview: (ev: object, meta: MockResourceMeta | null) => string };

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

  describe('payloadSections — request body inspector', () => {
    const comp = () => component as unknown as Comp;

    it('emits header + path param section for GET with path param', () => {
      const sections = comp().payloadSections({ type: 'caught', id: 1, ts: 0, args: [42] }, GET_META);
      expect(sections[0]).toMatchObject({ type: 'header', label: 'GET /pet/42' });
      expect(sections[1]).toMatchObject({ label: 'petId', json: '42', type: 'json' });
    });

    it('emits header + Query section for GET with query params', () => {
      const sections = comp().payloadSections({ type: 'caught', id: 1, ts: 0, args: [{ status: 'available' }] }, QUERY_META);
      expect(sections[0]).toMatchObject({ type: 'header', label: 'GET /pet/findByStatus' });
      expect(sections[1]).toMatchObject({ label: 'Query', type: 'json' });
      expect(JSON.parse(sections[1].json)).toEqual({ status: 'available' });
    });

    it('emits Body label for POST', () => {
      const sections = comp().payloadSections({ type: 'caught', id: 1, ts: 0, args: [{ name: 'Fido' }] }, POST_META);
      expect(sections[1]).toMatchObject({ label: 'Body', type: 'json' });
    });

    it('renders binary arg as string type badge', () => {
      const sections = comp().payloadSections({ type: 'caught', id: 1, ts: 0, args: ['[FormData]'] }, POST_META);
      expect(sections[1]).toMatchObject({ label: 'Body', json: '[FormData]', type: 'string' });
    });

    it('falls back to single Request section when meta is null', () => {
      const sections = comp().payloadSections({ type: 'caught', id: 1, ts: 0, args: [{ x: 1 }] }, null);
      expect(sections).toHaveLength(1);
      expect(sections[0]).toMatchObject({ label: 'Request' });
    });

    it('still emits Response and Error sections regardless of meta', () => {
      const sections = comp().payloadSections(
        { type: 'resolve', id: 1, ts: 0, value: { id: 1 }, error: undefined },
        GET_META,
      );
      expect(sections.some((s) => s.label === 'Response')).toBe(true);
    });
  });

  describe('preview — request events', () => {
    const comp = () => component as unknown as Comp;

    it('shows filled URL for caught event with meta', () => {
      const p = comp().preview({ type: 'caught', id: 1, ts: 0, args: [99] }, GET_META);
      expect(p).toBe('GET /pet/99');
    });

    it('falls back to JSON preview when meta is null', () => {
      const p = comp().preview({ type: 'caught', id: 1, ts: 0, args: [{ status: 'available' }] }, null);
      expect(p).toContain('status');
    });
  });
});
