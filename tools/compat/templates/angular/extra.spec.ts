// Behaviors of the generated tokens that are most likely to differ between Angular versions.
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpEventType, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { tick } from './tick';
import { ADD_PET, PETSTORE_BASE_URL, UPLOAD_FILE, provideAddPet, provideUploadFile, type AddPetBody } from './libs/petstore';

describe('compat extras (features that could differ between Angular versions)', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PETSTORE_BASE_URL, useValue: 'https://pets.test' },
        provideAddPet(),
        provideUploadFile(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('httpClient upload: reportProgress is set on the request and progress events are delivered', () => {
    const events: number[] = [];
    TestBed.inject(UPLOAD_FILE)('7', new Blob(['x'])).subscribe((e) => events.push(e.type));
    const req = http.expectOne('https://pets.test/pet/7/uploadImage');
    expect(req.request.reportProgress).toBe(true);
    req.event({ type: HttpEventType.UploadProgress, loaded: 5, total: 10 });
    req.flush({ code: 200, type: 'unknown', message: 'ok' });
    expect(events).toContain(HttpEventType.UploadProgress);
    expect(events.at(-1)).toBe(HttpEventType.Response);
  });

  it('httpResource: a valid response resolves, an invalid one hits the validateResponses parse hook', async () => {
    const pet = { name: 'Rex', photoUrls: [] } as AddPetBody;
    const ok = TestBed.runInInjectionContext(() => TestBed.inject(ADD_PET)(pet));
    tick();
    http.expectOne('https://pets.test/pet').flush({ id: 1, name: 'Rex', photoUrls: [] });
    await new Promise((r) => setTimeout(r, 0));
    tick();
    expect((ok.value() as { name: string } | undefined)?.name).toBe('Rex');

    const bad = TestBed.runInInjectionContext(() => TestBed.inject(ADD_PET)(signal(pet)));
    tick();
    http.expectOne('https://pets.test/pet').flush({ name: 5, photoUrls: 'nope' });
    await new Promise((r) => setTimeout(r, 0));
    tick();
    expect(bad.error()).toBeTruthy();
  });
});
