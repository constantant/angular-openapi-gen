import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeI18nRegionsListParams =
  paths['/youtube/v3/i18nRegions']['get']['parameters']['query'];

export type YoutubeI18nRegionsListResponse =
  paths['/youtube/v3/i18nRegions']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_I18N_REGIONS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeI18nRegionsListParams
      | (() => YoutubeI18nRegionsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeI18nRegionsListResponse>>
>('YOUTUBE_I18N_REGIONS_LIST');

export function provideYoutubeI18nRegionsList(): FactoryProvider {
  return {
    provide: YOUTUBE_I18N_REGIONS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeI18nRegionsListParams
          | (() => YoutubeI18nRegionsListParams | undefined),
      ) =>
        httpResource<YoutubeI18nRegionsListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/i18nRegions`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
            headers: {
              ...(oauth2?.() != null
                ? { Authorization: `Bearer ${oauth2()}` }
                : {}),
              ...(oauth2c?.() != null
                ? { Authorization: `Bearer ${oauth2c()}` }
                : {}),
            },
          };
        });
    },
  };
}
