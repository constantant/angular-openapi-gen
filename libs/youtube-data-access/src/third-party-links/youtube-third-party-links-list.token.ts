import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';

export type YoutubeThirdPartyLinksListParams =
  paths['/youtube/v3/thirdPartyLinks']['get']['parameters']['query'];

export type YoutubeThirdPartyLinksListResponse =
  paths['/youtube/v3/thirdPartyLinks']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_THIRD_PARTY_LINKS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeThirdPartyLinksListParams
      | (() => YoutubeThirdPartyLinksListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeThirdPartyLinksListResponse>>
>('YOUTUBE_THIRD_PARTY_LINKS_LIST');

export function provideYoutubeThirdPartyLinksList(): FactoryProvider {
  return {
    provide: YOUTUBE_THIRD_PARTY_LINKS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      return (
        params?:
          | YoutubeThirdPartyLinksListParams
          | (() => YoutubeThirdPartyLinksListParams | undefined),
      ) =>
        httpResource<YoutubeThirdPartyLinksListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/thirdPartyLinks`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
