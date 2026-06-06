import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export type YoutubeThirdPartyLinksInsertBody = NonNullable<
  paths['/youtube/v3/thirdPartyLinks']['post']['requestBody']
>['content']['application/json'];

export type YoutubeThirdPartyLinksInsertResponse =
  paths['/youtube/v3/thirdPartyLinks']['post']['responses']['200']['content']['application/json'];

export const YOUTUBE_THIRD_PARTY_LINKS_INSERT = new InjectionToken<
  (
    body:
      | YoutubeThirdPartyLinksInsertBody
      | Signal<YoutubeThirdPartyLinksInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeThirdPartyLinksInsertResponse>>
>('YOUTUBE_THIRD_PARTY_LINKS_INSERT');

export function provideYoutubeThirdPartyLinksInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_THIRD_PARTY_LINKS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      return (
        body:
          | YoutubeThirdPartyLinksInsertBody
          | Signal<YoutubeThirdPartyLinksInsertBody>,
      ) =>
        httpResource<YoutubeThirdPartyLinksInsertResponse>(() => ({
          url: `${base}/youtube/v3/thirdPartyLinks`,
          method: 'POST',
          body,
        }));
    },
  };
}
