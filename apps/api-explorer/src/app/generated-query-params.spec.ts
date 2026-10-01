import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {
  PETSTORE_BASE_URL,
  UPDATE_PET_WITH_FORM,
  UPLOAD_FILE,
  provideUpdatePetWithForm,
  provideUploadFile,
} from '@angular-openapi-gen/petstore-data-access';
import {
  YOUTUBE_BASE_URL,
  YOUTUBE_PLAYLISTS_INSERT,
  YOUTUBE_VIDEOS_INSERT,
  provideYoutubePlaylistsInsert,
  provideYoutubeVideosInsert,
  type YoutubePlaylistsInsertBody,
} from '@angular-openapi-gen/youtube-data-access';

/**
 * Wire-level checks that query params of non-GET endpoints actually reach the request — they
 * used to be dropped, so e.g. YouTube's required `part` could never be sent on an insert.
 * Uses the generated tokens with a real HttpClient (only the backend is faked).
 */
describe('generated tokens: query params on mutations', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PETSTORE_BASE_URL, useValue: 'https://pets.test' },
        { provide: YOUTUBE_BASE_URL, useValue: 'https://yt.test' },
        provideUploadFile(),
        provideUpdatePetWithForm(),
        provideYoutubeVideosInsert(),
        provideYoutubePlaylistsInsert(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('httpClient endpoints', () => {
    it('POST with a binary body sends the optional query params', () => {
      const blob = new Blob(['x']);
      TestBed.inject(UPLOAD_FILE)('7', blob, { additionalMetadata: 'hello world' }).subscribe();

      const req = http.expectOne((r) => r.url === 'https://pets.test/pet/7/uploadImage');
      expect(req.request.method).toBe('POST');
      expect(req.request.params.get('additionalMetadata')).toBe('hello world');
      expect(req.request.urlWithParams).toBe('https://pets.test/pet/7/uploadImage?additionalMetadata=hello%20world');
      expect(req.request.body).toBe(blob);
      req.flush({ code: 200, type: 'unknown', message: 'ok' });
    });

    it('omits the query string when params are not passed', () => {
      TestBed.inject(UPLOAD_FILE)('7', new Blob(['x'])).subscribe();
      const req = http.expectOne('https://pets.test/pet/7/uploadImage');
      expect(req.request.params.keys()).toEqual([]);
      req.flush({ code: 200 });
    });

    it('sends a spec-required query param (YouTube insert needs `part`) alongside a JSON body', () => {
      const body = { snippet: { title: 'My list' } } as YoutubePlaylistsInsertBody;
      TestBed.inject(YOUTUBE_PLAYLISTS_INSERT)(body, { part: ['snippet', 'status'] }).subscribe();

      const req = http.expectOne((r) => r.url === 'https://yt.test/youtube/v3/playlists');
      expect(req.request.method).toBe('POST');
      expect(req.request.params.getAll('part')).toEqual(['snippet', 'status']);
      expect(req.request.body).toEqual(body);
      req.flush({});
    });

    it('sends a spec-required query param with a binary body (videos.insert)', () => {
      const media = new Blob(['bytes']);
      TestBed.inject(YOUTUBE_VIDEOS_INSERT)(media, { part: ['snippet'] }).subscribe();

      const req = http.expectOne((r) => r.url === 'https://yt.test/youtube/v3/videos');
      expect(req.request.urlWithParams).toBe('https://yt.test/youtube/v3/videos?part=snippet');
      expect(req.request.body).toBe(media);
      req.flush({});
    });
  });

  describe('httpResource endpoints', () => {
    it('POST form endpoint sends its query params', () => {
      TestBed.runInInjectionContext(() =>
        TestBed.inject(UPDATE_PET_WITH_FORM)('7', { name: 'Rex', status: 'sold' }),
      );
      TestBed.tick();

      const req = http.expectOne((r) => r.url === 'https://pets.test/pet/7');
      expect(req.request.method).toBe('POST');
      expect(req.request.params.get('name')).toBe('Rex');
      expect(req.request.params.get('status')).toBe('sold');
      req.flush({});
    });

    it('stays idle while the params thunk returns undefined, then fires once it yields a value', () => {
      const enabled = signal(false);
      TestBed.runInInjectionContext(() =>
        TestBed.inject(UPDATE_PET_WITH_FORM)('7', () => (enabled() ? { name: 'Rex' } : undefined)),
      );
      TestBed.tick();
      http.expectNone((r) => r.url === 'https://pets.test/pet/7');

      enabled.set(true);
      TestBed.tick();
      const req = http.expectOne((r) => r.url === 'https://pets.test/pet/7');
      expect(req.request.params.get('name')).toBe('Rex');
      req.flush({});
    });
  });
});
