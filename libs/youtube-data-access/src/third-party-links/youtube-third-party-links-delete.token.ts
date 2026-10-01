import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export type YoutubeThirdPartyLinksDeleteParams =
  paths['/youtube/v3/thirdPartyLinks']['delete']['parameters']['query'];

export const YOUTUBE_THIRD_PARTY_LINKS_DELETE = new InjectionToken<
  (params: YoutubeThirdPartyLinksDeleteParams) => Observable<unknown>
>('YOUTUBE_THIRD_PARTY_LINKS_DELETE');

export function provideYoutubeThirdPartyLinksDelete(): FactoryProvider {
  return {
    provide: YOUTUBE_THIRD_PARTY_LINKS_DELETE,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(YOUTUBE_BASE_URL);
      return (params: YoutubeThirdPartyLinksDeleteParams) =>
        http.request<unknown>('DELETE', `${base}/youtube/v3/thirdPartyLinks`, {
          params: params as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        });
    },
  };
}
