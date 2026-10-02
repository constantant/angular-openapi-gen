/**
 * Integration test for `callOptions`: runs the real generator and parser (no mocks) and COMPILES the
 * output, with `@ts-expect-error` probes for what the types must accept and reject. The feature is
 * mostly types — a `defaultValue` narrowing the returned resource, spec-controlled fields refusing
 * to be overridden — so string assertions on the emitted code can't prove it.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { integrationWorkspace } from './integration-helpers';

const SPEC = `
openapi: 3.0.3
info: { title: Pets, version: '1' }
paths:
  /pets:
    get:
      operationId: listPets
      tags: [pets]
      parameters:
        - { in: query, name: status, schema: { type: string } }
      responses:
        '200': { description: ok, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/Pet' } } } } }
    post:
      operationId: createPet
      tags: [pets]
      requestBody: { content: { application/json: { schema: { $ref: '#/components/schemas/Pet' } } } }
      responses:
        '201': { description: created, content: { application/json: { schema: { $ref: '#/components/schemas/Pet' } } } }
  /note:
    get:
      operationId: getNote
      tags: [pets]
      responses:
        '200': { description: ok, content: { text/plain: { schema: { type: string } } } }
  /pic:
    get:
      operationId: getPic
      tags: [pets]
      responses:
        '200': { description: ok, content: { image/png: { schema: { type: string, format: binary } } } }
components:
  schemas:
    Pet:
      type: object
      required: [name, photoUrls]
      properties:
        name: { type: string }
        photoUrls: { type: array, items: { type: string } }
`;

const RESOURCE_PROBE = `
import { HttpContext } from '@angular/common/http';
import type { Injector } from '@angular/core';
import type { CreatePetFn, GetNoteFn, GetPicFn, ListPetsFn, ListPetsResponse } from './out';

declare const listPets: ListPetsFn;
declare const createPet: CreatePetFn;
declare const getNote: GetNoteFn;
declare const getPic: GetPicFn;
declare const injector: Injector;

// no options: unchanged, the value can still be undefined
export const plain = listPets();
export const plainValue: ListPetsResponse | undefined = plain.value();
// @ts-expect-error without a defaultValue the value can still be undefined
export const plainNarrow: ListPetsResponse = plain.value();

// a defaultValue removes undefined from the value's type
export const withDefault = listPets(undefined, { defaultValue: [] });
export const defaultValue: ListPetsResponse = withDefault.value();
export const note: string = getNote({ defaultValue: '' }).value();
export const pic: Blob = getPic({ defaultValue: new Blob() }).value();

// request and resource options are accepted
export const rich = listPets(
  { status: 'available' },
  { context: new HttpContext(), withCredentials: true, keepalive: true, headers: { 'X-A': 'b', 'X-B': ['c', 'd'] }, injector, equal: (a, b) => a === b },
);
export const mutation = createPet({ name: 'x', photoUrls: [] }, { context: new HttpContext(), withCredentials: true });

// @ts-expect-error an unknown option is rejected
listPets(undefined, { nope: 1 });
// @ts-expect-error the spec controls the url
listPets(undefined, { url: '/x' });
// @ts-expect-error ...the method
createPet({ name: 'x', photoUrls: [] }, { method: 'DELETE' });
// @ts-expect-error ...the body
createPet({ name: 'x', photoUrls: [] }, { body: {} });
// @ts-expect-error ...and the query params
listPets(undefined, { params: { status: 'x' } });
// @ts-expect-error parse is how validateResponses is wired
listPets(undefined, { parse: (v: unknown) => v });
// @ts-expect-error reportProgress is controlled by the generator
listPets(undefined, { reportProgress: true });
// @ts-expect-error a defaultValue must match the response type
listPets(undefined, { defaultValue: 'nope' });
`;

const CLIENT_PROBE = `
import { HttpContext } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { CreatePetFn, ListPetsFn, ListPetsResponse } from './out';

declare const listPets: ListPetsFn;
declare const createPet: CreatePetFn;

export const stream: Observable<ListPetsResponse> = listPets(
  { status: 'available' },
  { context: new HttpContext(), withCredentials: true, headers: { 'X-A': 'b' } },
);
export const noOptions: Observable<ListPetsResponse> = listPets();
export const mutation = createPet({ name: 'x', photoUrls: [] }, { context: new HttpContext() });

// @ts-expect-error defaultValue is an httpResource option, not an HttpClient one
listPets(undefined, { defaultValue: [] });
// @ts-expect-error an unknown option is rejected
listPets(undefined, { nope: 1 });
// @ts-expect-error the spec controls the body
createPet({ name: 'x', photoUrls: [] }, { body: {} });
`;

const { generateAndCompile, cleanup } = integrationWorkspace('oarg-call-options-test');
const compile = (name: string, options: Record<string, unknown>, probe: string) =>
  generateAndCompile(name, { fileName: 'spec.yaml', text: SPEC }, { baseUrlToken: 'PETS_BASE_URL', ...options }, probe);

describe('callOptions (real generator + real TypeScript compile)', () => {
  afterAll(() => cleanup());

  it('control: without the flag there are no call options to type-check', async () => {
    const ws = await compile('control', {}, RESOURCE_PROBE);
    expect(ws.diagnostics.join('\n')).toMatch(/has no exported member named 'ListPetsFn'/);
  }, 120_000);

  it('httpResource tokens: defaultValue narrows, spec-controlled fields are refused, and it all compiles', async () => {
    expect((await compile('resource', { callOptions: true }, RESOURCE_PROBE)).diagnostics).toEqual([]);
  }, 120_000);

  it('httpClient tokens: request options only, an Observable result, and it all compiles', async () => {
    expect((await compile('client', { callOptions: true, clientType: 'httpClient' }, CLIENT_PROBE)).diagnostics).toEqual([]);
  }, 120_000);

  it('composes with validateResponses, providedIn: root and the other type options', async () => {
    const options = { callOptions: true, validateResponses: true, providedIn: 'root', readWriteMarkers: true, readonlyResponses: true };
    expect((await compile('combined', options, '')).diagnostics).toEqual([]);
    expect((await compile('combined-client', { ...options, clientType: 'httpClient', reportProgress: true }, '')).diagnostics).toEqual([]);
  }, 180_000);
});
