import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { InjectionToken, Injector } from '@angular/core';
import type { httpResource } from '@angular/common/http';
import { MockResourceBus } from './mock-resource-bus';
import { provideMockResource } from './provide-mock-resource';
import type { MockResourceMeta } from './mock-resource-meta';

type Pets = { id: number }[];
type Fn = (...args: unknown[]) => ReturnType<typeof httpResource<Pets>>;

/** The per-call `defaultValue` option (`--callOptions`): mocks must behave like the real resource. */
describe('provideMockResource: the defaultValue call option', () => {
  const TOKEN = new InjectionToken<Fn>('LIST');
  const meta = (args?: string[]): MockResourceMeta => ({ specId: 's', operationId: 'listPets', path: '/pets', method: 'get', args });
  let bus: MockResourceBus;

  const setup = (m: MockResourceMeta | undefined, initial?: Parameters<typeof provideMockResource<Pets>>[2]) => {
    bus = new MockResourceBus();
    const injector = Injector.create({
      providers: [{ provide: MockResourceBus, useValue: bus }, provideMockResource<Pets>(TOKEN, 'LIST', initial, m)],
    });
    return injector.get(TOKEN);
  };
  const entry = () => window.__openApiMocks__!['LIST'];

  beforeEach(() => { delete window.__openApiMocks__; });
  afterEach(() => { delete window.__openApiMocks__; });

  it('value() is the default until something resolves', () => {
    const fn = setup(meta(['params', 'options']));
    const ref = fn(undefined, { defaultValue: [] });
    expect(ref.value()).toEqual([]);
    expect(entry().getState().value).toEqual([]);
  });

  it('a resolved value replaces it, and reset() brings it back', () => {
    const fn = setup(meta(['params', 'options']));
    const ref = fn(undefined, { defaultValue: [] });
    entry().resolve([{ id: 1 }]);
    expect(ref.value()).toEqual([{ id: 1 }]);
    entry().reset();
    expect(ref.value()).toEqual([]);
  });

  it('is replaced by an initialBehavior value too', () => {
    const fn = setup(meta(['params', 'options']), { value: [{ id: 9 }] });
    expect(fn(undefined, { defaultValue: [] }).value()).toEqual([{ id: 9 }]);
  });

  it('the default is still there while loading and after an error', () => {
    const fn = setup(meta(['params', 'options']), { loading: true });
    const ref = fn(undefined, { defaultValue: [{ id: 0 }] });
    expect(ref.isLoading()).toBe(true);
    expect(ref.value()).toEqual([{ id: 0 }]);
    entry().fail(new Error('x'));
    expect(ref.value()).toEqual([{ id: 0 }]);
  });

  it('finds the options by name wherever they are in the argument list', () => {
    const fn = setup(meta(['petId', 'body', 'params', 'options']));
    expect(fn('7', { name: 'x' }, undefined, { defaultValue: [{ id: 5 }] }).value()).toEqual([{ id: 5 }]);
  });

  it('without a call option there is no default (value() stays undefined)', () => {
    const fn = setup(meta(['params', 'options']));
    expect(fn(undefined).value()).toBeUndefined();
    expect(fn(undefined, {}).value()).toBeUndefined();
  });

  it('ignores a defaultValue when the mock does not know where the options are', () => {
    const fn = setup(meta(), undefined); // generated without --callOptions: no argument names
    expect(fn(undefined, { defaultValue: [] }).value()).toBeUndefined();
  });

  it('does not mistake a body that has a defaultValue field for the options', () => {
    const fn = setup(meta(['body', 'options']));
    expect(fn({ defaultValue: 'a body field' }).value()).toBeUndefined();
  });
});
