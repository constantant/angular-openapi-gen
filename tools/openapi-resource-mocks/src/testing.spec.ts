import { describe, it, expect, afterEach } from 'vitest';
import {
  ApplicationRef,
  InjectionToken,
  inject,
  runInInjectionContext,
  type EnvironmentProviders,
  type Provider,
} from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import {
  HttpClient,
  HttpEventType,
  httpResource,
  provideHttpClient,
  withFetch,
  type HttpEvent,
} from '@angular/common/http';
import { provideXhrHttpClient } from './lib/xhr-backend.testing';
import { firstValueFrom, toArray } from 'rxjs';
import { MOCK_BASE_URL, flushMocks, mockEndpoint, uninstallMockInterception, type MockEndpoint } from './testing';

interface Pet {
  id: number;
  name: string;
}

const BASE_URL = new InjectionToken<string>('BASE_URL');
const LIST_PETS_TOKEN = new InjectionToken<() => string>('LIST_PETS');

const LIST_PETS: MockEndpoint<Pet[]> = {
  key: 'LIST_PETS',
  baseUrl: BASE_URL,
  meta: { specId: 'pets', operationId: 'listPets', path: '/pets', method: 'get' },
  provide: () => ({
    provide: LIST_PETS_TOKEN,
    useFactory: () => {
      const base = inject(BASE_URL);
      return () => `${base}/pets`;
    },
  }),
};
const UPDATE_PET: MockEndpoint<Pet> = {
  key: 'UPDATE_PET',
  baseUrl: BASE_URL,
  meta: { specId: 'pets', operationId: 'updatePet', path: '/pets/{id}', method: 'put' },
};

const rex: Pet = { id: 1, name: 'Rex' };
const luna: Pet = { id: 2, name: 'Luna' };

describe('mockEndpoint', () => {
  let app: ApplicationRef | undefined;

  const create = async (...providers: Array<Provider | EnvironmentProviders>): Promise<HttpClient> => {
    app = await createApplication({ providers });
    return app.injector.get(HttpClient);
  };

  afterEach(() => {
    app?.destroy();
    app = undefined;
    uninstallMockInterception();
  });

  it('answers through the real HttpClient and records the request', async () => {
    const pets = mockEndpoint(LIST_PETS, { value: [rex] });
    const http = await create(provideHttpClient(withFetch()), pets);

    expect(await firstValueFrom(http.get(`${MOCK_BASE_URL}/pets`, { params: { status: 'available' } }))).toEqual([rex]);
    pets.expectCalled();
    pets.expectCalledWith({ status: 'available' });
    expect(() => pets.expectCalledWith({ status: 'sold' })).toThrow(/actual requests were/);
  });

  it('provides the real token and a default base URL', async () => {
    await create(provideHttpClient(), mockEndpoint(LIST_PETS, { value: [] }));
    expect(app!.injector.get(LIST_PETS_TOKEN)()).toBe(`${MOCK_BASE_URL}/pets`);
  });

  it('lets a base URL listed after the handle win', async () => {
    const pets = mockEndpoint(LIST_PETS, { value: [rex] });
    const http = await create(provideHttpClient(), pets, { provide: BASE_URL, useValue: 'https://api.example.com' });
    expect(await firstValueFrom(http.get('https://api.example.com/pets'))).toEqual([rex]);
  });

  it('records path params and the body', async () => {
    const update = mockEndpoint(UPDATE_PET, { value: rex });
    const http = await create(provideHttpClient(), update);
    await firstValueFrom(http.put(`${MOCK_BASE_URL}/pets/1`, { name: 'Rex' }));
    update.expectCalledWith('1', { name: 'Rex' });
    expect(update.calls).toHaveLength(1);
  });

  it('steps through a sequence, repeating the last entry', async () => {
    const pets = mockEndpoint(LIST_PETS, {
      sequence: [{ error: { message: 'timeout' }, status: 504 }, { value: [rex] }],
    });
    const http = await create(provideHttpClient(), pets);
    const get = (): Promise<unknown> => firstValueFrom(http.get(`${MOCK_BASE_URL}/pets`)).catch((e) => e.status);

    expect(await get()).toBe(504);
    expect(await get()).toEqual([rex]);
    expect(await get()).toEqual([rex]);
  });

  it('holds every request when no behavior is given, until resolved', async () => {
    const pets = mockEndpoint(LIST_PETS);
    const http = await create(provideHttpClient(), pets);
    let result: unknown;
    http.get(`${MOCK_BASE_URL}/pets`).subscribe((value) => (result = value));

    await flushMocks();
    expect(result).toBeUndefined();
    pets.expectCalled();

    pets.resolve([luna]);
    await flushMocks();
    expect(result).toEqual([luna]);
  });

  it('fail() answers with the given status', async () => {
    const pets = mockEndpoint(LIST_PETS);
    const http = await create(provideHttpClient(), pets);
    const status = firstValueFrom(http.get(`${MOCK_BASE_URL}/pets`)).catch((e) => e.status);
    pets.fail({ message: 'nope' }, 403);
    expect(await status).toBe(403);
  });

  it('throws a helpful error when controlled before it is registered', () => {
    expect(() => mockEndpoint(LIST_PETS).resolve([])).toThrow(/not registered yet/);
  });

  it('emits upload progress events before the response on the XHR backend', async () => {
    const update = mockEndpoint(UPDATE_PET, {
      progress: [
        { type: 'upload', loaded: 1, total: 4 },
        { type: 'upload', loaded: 4, total: 4 },
      ],
      value: rex,
    });
    const http = await create(provideXhrHttpClient(), update);
    const events = await firstValueFrom(
      http
        .request<Pet>('PUT', `${MOCK_BASE_URL}/pets/1`, { body: new Blob(['x']), reportProgress: true, observe: 'events' })
        .pipe(toArray()),
    );
    const types = events.map((e: HttpEvent<Pet>) => e.type);
    expect(types).toEqual([
      HttpEventType.Sent,
      HttpEventType.UploadProgress,
      HttpEventType.UploadProgress,
      HttpEventType.Response,
    ]);
    expect(events[1]).toMatchObject({ loaded: 1, total: 4 });
  });

  it('resolve() re-runs live httpResources tracked by a generated token', async () => {
    const pets = mockEndpoint(LIST_PETS, { value: [rex] });
    await create(provideHttpClient(), pets);
    const resource = runInInjectionContext(app!.injector, () => httpResource<Pet[]>(() => `${MOCK_BASE_URL}/pets`));
    // What a token generated with `mockHooks` does through its `mock-hook.ts`.
    (globalThis as unknown as { __oarmTrack__: (key: string, ref: unknown) => void }).__oarmTrack__('LIST_PETS', resource);

    await app!.whenStable();
    expect(resource.value()).toEqual([rex]);

    pets.resolve([luna]);
    await app!.whenStable();
    expect(resource.value()).toEqual([luna]);
    expect(pets.calls).toHaveLength(2);
  });
});
