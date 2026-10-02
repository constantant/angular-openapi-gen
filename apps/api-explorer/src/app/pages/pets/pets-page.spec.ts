import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { mockHttpEvents, mockResource } from '@constantant/openapi-resource-mocks/testing';
import {
  ADD_PET,
  DELETE_PET,
  FIND_PETS_BY_STATUS,
  UPLOAD_FILE,
} from '@angular-openapi-gen/petstore-data-access';
import { PetsPageComponent } from './pets-page';

/**
 * Component tests for the photo upload's progress UI. UPLOAD_FILE is generated with
 * `--clientType=httpClient --reportProgress`, so it yields `Observable<HttpEvent<T>>`;
 * `mockHttpEvents` drives it with progress events and no browser, DOM or bus.
 */
describe('PetsPageComponent photo upload', () => {
  const file = new File(['bytes'], 'photo.jpg', { type: 'image/jpeg' });
  const at = (loaded: number) => ({ type: 'upload' as const, loaded, total: 4_000_000 });

  // The pet cards use `@defer (on viewport)`, which needs IntersectionObserver (absent in jsdom).
  beforeAll(() => {
    const noop = (): void => undefined;
    (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver ??= class {
      observe = noop;
      unobserve = noop;
      disconnect = noop;
      takeRecords = (): unknown[] => [];
    };
  });

  async function setup(upload: ReturnType<typeof mockHttpEvents>): Promise<ComponentFixture<PetsPageComponent>> {
    TestBed.configureTestingModule({
      imports: [PetsPageComponent],
      providers: [
        mockResource(FIND_PETS_BY_STATUS, { value: [{ id: 7, name: 'Rex', status: 'available' }] }),
        mockResource(ADD_PET),
        mockResource(DELETE_PET),
        upload,
      ],
    });
    const fixture = TestBed.createComponent(PetsPageComponent);
    fixture.detectChanges();
    fixture.componentInstance.selectedPetId.set(7);
    fixture.componentInstance.uploadFile.set(file);
    fixture.detectChanges();
    await fixture.whenStable(); // the detail panel is behind `@defer (when selectedPetId() !== null)`
    fixture.detectChanges();
    return fixture;
  }
  const el = (f: ComponentFixture<PetsPageComponent>) => f.nativeElement as HTMLElement;
  const bar = (f: ComponentFixture<PetsPageComponent>) =>
    el(f).querySelector('[data-testid="upload-progress"]');
  const text = (f: ComponentFixture<PetsPageComponent>) =>
    el(f).querySelector('[data-testid="upload-progress-text"]')?.textContent?.replace(/\s+/g, ' ').trim();

  it('shows a determinate bar with percent and bytes while the upload is held at 25 %', async () => {
    const upload = mockHttpEvents(UPLOAD_FILE, { loading: true, progress: [at(1_000_000)] });
    const f = await setup(upload);

    f.componentInstance.uploadPhoto();
    f.detectChanges();

    upload.expectCalledWith('7', file);
    expect(bar(f)?.getAttribute('aria-valuenow')).toBe('25');
    expect(text(f)).toBe('25% · 976.6 KB / 3.8 MB');
    expect(el(f).querySelector('[data-testid="upload-cancel"]')).toBeTruthy();
  });

  it('starts indeterminate ("Starting…") before the first progress event', async () => {
    const f = await setup(mockHttpEvents(UPLOAD_FILE, { loading: true }));
    f.componentInstance.uploadPhoto();
    f.detectChanges();
    expect(bar(f)).toBeTruthy();
    expect(text(f)).toBe('Starting…');
  });

  it('completes: success message shown, bar and Cancel gone', async () => {
    const f = await setup(
      mockHttpEvents(UPLOAD_FILE, {
        progress: [at(2_000_000), at(4_000_000)],
        value: { code: 200, type: 'unknown', message: 'Stored' },
      }),
    );
    f.componentInstance.uploadPhoto();
    f.detectChanges();

    expect(el(f).querySelector('.upload-ok')?.textContent).toContain('Stored');
    expect(bar(f)).toBeNull();
    expect(el(f).querySelector('[data-testid="upload-cancel"]')).toBeNull();
    expect(f.componentInstance.uploadLoading()).toBe(false);
  });

  it('a failure says where the upload stopped', async () => {
    const f = await setup(mockHttpEvents(UPLOAD_FILE, { progress: [at(2_000_000)], error: new Error('reset') }));
    f.componentInstance.uploadPhoto();
    f.detectChanges();

    expect(el(f).querySelector('.upload-err')?.textContent).toContain('Upload failed at 50%.');
    expect(bar(f)).toBeNull();
  });

  it('Cancel aborts the in-flight upload', async () => {
    const f = await setup(mockHttpEvents(UPLOAD_FILE, { loading: true, progress: [at(1_000_000)] }));
    f.componentInstance.uploadPhoto();
    f.detectChanges();

    (el(f).querySelector('[data-testid="upload-cancel"]') as HTMLButtonElement).click();
    f.detectChanges();

    expect(el(f).querySelector('.upload-err')?.textContent).toContain('Upload cancelled.');
    expect(bar(f)).toBeNull();
    expect(f.componentInstance.uploadLoading()).toBe(false);
  });
});
