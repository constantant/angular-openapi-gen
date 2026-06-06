import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export type YoutubeThirdPartyLinksUpdateBody = NonNullable<
  paths['/youtube/v3/thirdPartyLinks']['put']['requestBody']
>['content']['application/json'];

export type YoutubeThirdPartyLinksUpdateResponse =
  paths['/youtube/v3/thirdPartyLinks']['put']['responses']['200']['content']['application/json'];

export const YOUTUBE_THIRD_PARTY_LINKS_UPDATE = new InjectionToken<
  (
    body:
      | YoutubeThirdPartyLinksUpdateBody
      | Signal<YoutubeThirdPartyLinksUpdateBody>,
  ) => ReturnType<typeof httpResource<YoutubeThirdPartyLinksUpdateResponse>>
>('YOUTUBE_THIRD_PARTY_LINKS_UPDATE');

export function provideYoutubeThirdPartyLinksUpdate(): FactoryProvider {
  return {
    provide: YOUTUBE_THIRD_PARTY_LINKS_UPDATE,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      return (
        body:
          | YoutubeThirdPartyLinksUpdateBody
          | Signal<YoutubeThirdPartyLinksUpdateBody>,
      ) =>
        httpResource<YoutubeThirdPartyLinksUpdateResponse>(() => ({
          url: `${base}/youtube/v3/thirdPartyLinks`,
          method: 'PUT',
          body,
        }));
    },
  };
}
