import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export const YOUTUBE_THIRD_PARTY_LINKS_DELETE = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown>>
>('YOUTUBE_THIRD_PARTY_LINKS_DELETE');

export function provideYoutubeThirdPartyLinksDelete(): FactoryProvider {
  return {
    provide: YOUTUBE_THIRD_PARTY_LINKS_DELETE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      return () =>
        httpResource<unknown>(() => ({
          url: `${base}/youtube/v3/thirdPartyLinks`,
          method: 'DELETE',
        }));
    },
  };
}
