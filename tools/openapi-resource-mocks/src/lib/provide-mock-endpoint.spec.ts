import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  ApplicationRef,
  InjectionToken,
  type EnvironmentProviders,
  type Provider,
} from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideXhrHttpClient } from './xhr-backend.testing';
import { firstValueFrom } from 'rxjs';
import { uninstallMockInterception } from './interception/install';
import {
  provideMockEndpoint,
  type MockEndpoint,
} from './provide-mock-endpoint';
import type { MockResourceMeta } from './mock-resource-meta';

const BASE_URL = new InjectionToken<string>('BASE_URL');
const BASE = 'https://api.example.com/v2';

const LIST_META: MockResourceMeta = {
  specId: 'pets',
  operationId: 'listPets',
  path: '/pets',
  method: 'get',
};
const GET_META: MockResourceMeta = {
  specId: 'pets',
  operationId: 'getPet',
  path: '/pets/{id}',
  method: 'get',
};

const LIST_PETS: MockEndpoint<{ id: number }[]> = {
  key: 'LIST_PETS',
  baseUrl: BASE_URL,
  meta: LIST_META,
};
const GET_PET: MockEndpoint<{ id: number }> = {
  key: 'GET_PET',
  baseUrl: BASE_URL,
  meta: GET_META,
};

describe('provideMockEndpoint', () => {
  let originalFetch: typeof fetch;
  let nativeFetch: ReturnType<typeof vi.fn>;
  let app: ApplicationRef | undefined;

  const create = async (
    ...providers: Array<Provider | EnvironmentProviders>
  ): Promise<ApplicationRef> =>
    (app = await createApplication({
      providers: [{ provide: BASE_URL, useValue: BASE }, ...providers],
    }));

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    nativeFetch = vi.fn(
      async () => new Response('{"real":true}', { status: 200 }),
    );
    globalThis.fetch = nativeFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    app?.destroy();
    app = undefined;
    uninstallMockInterception();
    globalThis.fetch = originalFetch;
  });

  it('registers the endpoint with its meta when the application is created', async () => {
    await create(provideMockEndpoint(LIST_PETS, { value: [] }));
    expect(window.__openApiMocks__!['LIST_PETS'].getMeta()).toEqual(LIST_META);
  });

  it('unregisters the endpoint when the application is destroyed', async () => {
    (await create(provideMockEndpoint(LIST_PETS, { value: [] }))).destroy();
    app = undefined;
    expect(window.__openApiMocks__?.['LIST_PETS']).toBeUndefined();
  });

  it('mocks only the provided endpoint for a real HttpClient on the fetch backend', async () => {
    const http = (
      await create(
        provideHttpClient(withFetch()),
        provideMockEndpoint(LIST_PETS, { value: [{ id: 1 }] }),
      )
    ).injector.get(HttpClient);

    expect(
      await firstValueFrom(http.get(`${BASE}/pets`, { params: { limit: 5 } })),
    ).toEqual([{ id: 1 }]);
    expect(nativeFetch).not.toHaveBeenCalled();

    expect(await firstValueFrom(http.get(`${BASE}/owners`))).toEqual({
      real: true,
    });
    expect(nativeFetch).toHaveBeenCalledTimes(1);
  });

  it('delivers an error behavior as an HttpErrorResponse', async () => {
    const http = (
      await create(
        provideHttpClient(withFetch()),
        provideMockEndpoint(GET_PET, {
          error: { message: 'missing' },
          status: 404,
        }),
      )
    ).injector.get(HttpClient);

    const error = await firstValueFrom(http.get(`${BASE}/pets/1`)).catch(
      (e: unknown) => e,
    );
    expect(error).toBeInstanceOf(HttpErrorResponse);
    expect((error as HttpErrorResponse).status).toBe(404);
    expect((error as HttpErrorResponse).error).toEqual({ message: 'missing' });
  });

  it('mocks a real HttpClient on the XHR backend', async () => {
    const http = (
      await create(
        provideXhrHttpClient(),
        provideMockEndpoint(GET_PET, {
          value: { id: 3 },
          headers: { 'X-Trace': 't' },
        }),
      )
    ).injector.get(HttpClient);

    const response = await firstValueFrom(
      http.get(`${BASE}/pets/3`, { observe: 'response' }),
    );
    expect(response.body).toEqual({ id: 3 });
    expect(response.headers.get('X-Trace')).toBe('t');
    expect(response.url).toBe(`${BASE}/pets/3`);
  });
});
