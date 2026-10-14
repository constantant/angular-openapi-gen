import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { flushMocks, mockEndpoint, uninstallMockInterception } from '@constantant/openapi-resource-mocks/testing';
import {
  ADD_PET_MOCK,
  DELETE_PET_MOCK,
  FIND_PETS_BY_STATUS_MOCK,
  UPLOAD_FILE_MOCK,
} from '@angular-openapi-gen/petstore-data-access/mock';
import type { UploadFileResponse as UploadResponse } from '@angular-openapi-gen/petstore-data-access';
import { PetsPageComponent } from './pets-page';

/**
 * Component tests for the photo upload's progress UI. The component uses the real tokens and the
 * real HttpClient; `mockEndpoint` answers at the transport layer. UPLOAD_FILE is generated with
 * `--clientType=httpClient --reportProgress`, so it yields `Observable<HttpEvent<T>>`, and upload
 * progress needs the XHR backend (`withXhr()`), exactly as in the app.
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

  afterAll(() => uninstallMockInterception());

  type UploadMock = ReturnType<typeof mockEndpoint<UploadResponse>>;
  const mockUpload = (behavior?: Parameters<typeof mockEndpoint<UploadResponse>>[1]): UploadMock =>
    mockEndpoint(UPLOAD_FILE_MOCK, behavior);

  async function setup(upload: UploadMock): Promise<ComponentFixture<PetsPageComponent>> {
    TestBed.configureTestingModule({
      imports: [PetsPageComponent],
      providers: [
        provideHttpClient(withXhr()),
        mockEndpoint(FIND_PETS_BY_STATUS_MOCK, {
          value: [{ id: 7, name: 'Rex', status: 'available', photoUrls: [] }],
        }),
        mockEndpoint(ADD_PET_MOCK),
        mockEndpoint(DELETE_PET_MOCK),
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
    const upload = mockUpload({ loading: true, progress: [at(1_000_000)] });
    const f = await setup(upload);

    f.componentInstance.uploadPhoto();
    await flushMocks();
    f.detectChanges();

    upload.expectCalledWith('7', file);
    expect(bar(f)?.getAttribute('aria-valuenow')).toBe('25');
    expect(text(f)).toBe('25% · 976.6 KB / 3.8 MB');
    expect(el(f).querySelector('[data-testid="upload-cancel"]')).toBeTruthy();
  });

  it('starts indeterminate ("Starting…") before the first progress event', async () => {
    const f = await setup(mockUpload({ loading: true }));
    f.componentInstance.uploadPhoto();
    await flushMocks();
    f.detectChanges();
    expect(bar(f)).toBeTruthy();
    expect(text(f)).toBe('Starting…');
  });

  it('completes: success message shown, bar and Cancel gone', async () => {
    const f = await setup(
      mockUpload({
        progress: [at(2_000_000), at(4_000_000)],
        value: { code: 200, type: 'unknown', message: 'Stored' },
      }),
    );
    f.componentInstance.uploadPhoto();
    await f.whenStable();
    f.detectChanges();

    expect(el(f).querySelector('.upload-ok')?.textContent).toContain('Stored');
    expect(bar(f)).toBeNull();
    expect(el(f).querySelector('[data-testid="upload-cancel"]')).toBeNull();
    expect(f.componentInstance.uploadLoading()).toBe(false);
  });

  it('a failure says where the upload stopped', async () => {
    const f = await setup(mockUpload({ progress: [at(2_000_000)], error: { message: 'reset' } }));
    f.componentInstance.uploadPhoto();
    await f.whenStable();
    f.detectChanges();

    expect(el(f).querySelector('.upload-err')?.textContent).toContain('Upload failed at 50%.');
    expect(bar(f)).toBeNull();
  });

  it('Cancel aborts the in-flight upload', async () => {
    const f = await setup(mockUpload({ loading: true, progress: [at(1_000_000)] }));
    f.componentInstance.uploadPhoto();
    await flushMocks();
    f.detectChanges();

    (el(f).querySelector('[data-testid="upload-cancel"]') as HTMLButtonElement).click();
    f.detectChanges();

    expect(el(f).querySelector('.upload-err')?.textContent).toContain('Upload cancelled.');
    expect(bar(f)).toBeNull();
    expect(f.componentInstance.uploadLoading()).toBe(false);
  });
});
