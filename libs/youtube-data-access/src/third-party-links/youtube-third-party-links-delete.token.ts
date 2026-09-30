import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export const YOUTUBE_THIRD_PARTY_LINKS_DELETE = new InjectionToken<
  () => Observable<unknown>
>('YOUTUBE_THIRD_PARTY_LINKS_DELETE');

export function provideYoutubeThirdPartyLinksDelete(): FactoryProvider {
  return {
    provide: YOUTUBE_THIRD_PARTY_LINKS_DELETE,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      return () =>
        http.request<unknown>(
          'DELETE',
          `${base}/youtube/v3/thirdPartyLinks`,
          {},
        );
    },
  };
}
