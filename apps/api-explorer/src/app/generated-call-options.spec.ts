import { Injector, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  HttpContext,
  HttpContextToken,
  HttpEventType,
  provideHttpClient,
  withInterceptors,
  type HttpInterceptorFn,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ADD_PET,
  API_KEY,
  FIND_PETS_BY_STATUS,
  GET_INVENTORY,
  PETSTORE_AUTH,
  PETSTORE_BASE_URL,
  UPLOAD_FILE,
  provideAddPet,
  provideFindPetsByStatus,
  provideGetInventory,
  provideUploadFile,
  type AddPetBody,
  type AddPetOptions,
} from '@angular-openapi-gen/petstore-data-access';

/**
 * Wire-level checks for `--callOptions` (per-call request options): what reaches the request when a
 * caller passes an HttpContext, headers, withCredentials or the httpResource options. Real generated
 * tokens, a real HttpClient with a recording interceptor, and only the backend faked.
 */
describe('generated tokens: per-call options', () => {
  const SKIP_AUTH = new HttpContextToken<boolean>(() => false);
  const seenByInterceptor: boolean[] = [];
  const recorder: HttpInterceptorFn = (req, next) => {
    seenByInterceptor.push(req.context.get(SKIP_AUTH));
    return next(req);
  };
  const BASE = 'https://pets.test';
  const pet = { name: 'Rex', photoUrls: [] } as AddPetBody;
  let http: HttpTestingController;

  // `TestBed.tick()` doesn't exist before Angular 20.x (the compat matrix runs this spec there too).
  const tick = (): void => {
    const t = TestBed as unknown as { tick?: () => void; flushEffects?: () => void };
    (t.tick ?? t.flushEffects)!.call(t);
  };
  const inCtx = <T>(fn: () => T): T => TestBed.runInInjectionContext(fn);

  beforeEach(() => {
    seenByInterceptor.length = 0;
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([recorder])),
        provideHttpClientTesting(),
        { provide: PETSTORE_BASE_URL, useValue: BASE },
        { provide: PETSTORE_AUTH, useValue: signal<string | null>('generated-token') },
        { provide: API_KEY, useValue: signal<string | null>('generated-key') },
        provideFindPetsByStatus(),
        provideAddPet(),
        provideGetInventory(),
        provideUploadFile(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('httpResource tokens', () => {
    const find = () => TestBed.inject(FIND_PETS_BY_STATUS);
    const request = () => http.expectOne((r) => r.url === `${BASE}/pet/findByStatus`);

    it('an HttpContext reaches the interceptor', () => {
      inCtx(() => find()(() => ({ status: 'available' }), { context: new HttpContext().set(SKIP_AUTH, true) }));
      tick();
      request().flush([]);
      expect(seenByInterceptor).toEqual([true]);
    });

    it('without options the context is the default', () => {
      inCtx(() => find()(() => ({ status: 'available' })));
      tick();
      request().flush([]);
      expect(seenByInterceptor).toEqual([false]);
    });

    it('withCredentials reaches the request', () => {
      inCtx(() => find()(undefined, { withCredentials: true }));
      tick();
      const req = request();
      expect(req.request.withCredentials).toBe(true);
      req.flush([]);
    });

    it('caller headers are merged over the generated auth header, and win on a clash', () => {
      inCtx(() => find()(undefined, { headers: { 'X-Trace': 'abc' } }));
      tick();
      let req = request();
      expect(req.request.headers.get('Authorization')).toBe('Bearer generated-token');
      expect(req.request.headers.get('X-Trace')).toBe('abc');
      req.flush([]);

      inCtx(() => find()(undefined, { headers: { Authorization: 'Bearer from-caller' } }));
      tick();
      req = request();
      expect(req.request.headers.get('Authorization')).toBe('Bearer from-caller');
      req.flush([]);
    });

    it('a defaultValue is the value while loading, then the response replaces it', async () => {
      const res = inCtx(() => find()(undefined, { defaultValue: [] }));
      tick();
      expect(res.value()).toEqual([]);
      request().flush([{ id: 1, name: 'Rex', photoUrls: [] }]);
      await new Promise((r) => setTimeout(r, 0));
      tick();
      expect(res.value()).toEqual([{ id: 1, name: 'Rex', photoUrls: [] }]);
    });

    it('without a defaultValue the value is undefined while loading', () => {
      const res = inCtx(() => find()());
      tick();
      expect(res.value()).toBeUndefined();
      request().flush([]);
    });

    it('an injector lets it be called outside an injection context', () => {
      const injector = TestBed.inject(Injector);
      // no runInInjectionContext: without `injector` httpResource would throw NG0203
      find()(undefined, { injector });
      tick();
      request().flush([]);
    });

    it('options set to undefined are ignored', () => {
      inCtx(() => find()(undefined, { withCredentials: undefined, context: undefined, headers: undefined }));
      tick();
      const req = request();
      expect(req.request.withCredentials).toBe(false);
      expect(req.request.headers.get('Authorization')).toBe('Bearer generated-token');
      req.flush([]);
    });

    it('fields the spec controls cannot be overridden, even by a cast', () => {
      inCtx(() =>
        find()(() => ({ status: 'sold' }), {
          url: 'https://evil.test/x',
          method: 'DELETE',
          params: { status: 'hijacked' },
        } as never),
      );
      tick();
      const req = request();
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('status')).toBe('sold');
      req.flush([]);
    });

    it('the validateResponses hook cannot be replaced (an invalid response still errors)', async () => {
      const res = inCtx(() => TestBed.inject(ADD_PET)(pet, { parse: () => 'hijacked' } as unknown as AddPetOptions));
      tick();
      http.expectOne(`${BASE}/pet`).flush({ name: 5, photoUrls: 'nope' });
      await new Promise((r) => setTimeout(r, 0));
      tick();
      expect(res.error()).toBeTruthy();
    });

    it('a mutation takes the options after the body', () => {
      inCtx(() => TestBed.inject(ADD_PET)(pet, { withCredentials: true, context: new HttpContext().set(SKIP_AUTH, true) }));
      tick();
      const req = http.expectOne(`${BASE}/pet`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(pet);
      expect(req.request.withCredentials).toBe(true);
      expect(seenByInterceptor).toEqual([true]);
      req.flush({ id: 1, ...pet });
    });
  });

  describe('httpClient tokens', () => {
    it('context, headers and withCredentials reach the request, merged with the generated api key', () => {
      TestBed.inject(GET_INVENTORY)({
        context: new HttpContext().set(SKIP_AUTH, true),
        withCredentials: true,
        headers: { 'X-Trace': 'abc' },
      }).subscribe();
      const req = http.expectOne(`${BASE}/store/inventory`);
      expect(req.request.withCredentials).toBe(true);
      expect(req.request.headers.get('api_key')).toBe('generated-key');
      expect(req.request.headers.get('X-Trace')).toBe('abc');
      expect(seenByInterceptor).toEqual([true]);
      req.flush({});
    });

    it('a caller header overrides the generated api key', () => {
      TestBed.inject(GET_INVENTORY)({ headers: { api_key: 'from-caller' } }).subscribe();
      const req = http.expectOne(`${BASE}/store/inventory`);
      expect(req.request.headers.get('api_key')).toBe('from-caller');
      req.flush({});
    });

    it('without options the request is unchanged', () => {
      TestBed.inject(GET_INVENTORY)().subscribe();
      const req = http.expectOne(`${BASE}/store/inventory`);
      expect(req.request.withCredentials).toBe(false);
      expect(req.request.headers.get('api_key')).toBe('generated-key');
      req.flush({});
    });

    it('an upload keeps reporting progress when options are passed', () => {
      const types: number[] = [];
      const file = new Blob(['x']);
      TestBed.inject(UPLOAD_FILE)('7', file, undefined, { context: new HttpContext().set(SKIP_AUTH, true) }).subscribe((e) => types.push(e.type));
      const req = http.expectOne(`${BASE}/pet/7/uploadImage`);
      expect(req.request.reportProgress).toBe(true);
      expect(req.request.body).toBe(file);
      req.event({ type: HttpEventType.UploadProgress, loaded: 5, total: 10 });
      req.flush({ code: 200, type: 'unknown', message: 'ok' });
      expect(types).toContain(HttpEventType.UploadProgress);
      expect(seenByInterceptor).toEqual([true]);
    });
  });
});
