import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeActivitiesListParams =
  paths['/youtube/v3/activities']['get']['parameters']['query'];

export type YoutubeActivitiesListResponse =
  paths['/youtube/v3/activities']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_ACTIVITIES_LIST = new InjectionToken<
  (
    params?:
      | YoutubeActivitiesListParams
      | (() => YoutubeActivitiesListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeActivitiesListResponse>>
>('YOUTUBE_ACTIVITIES_LIST');

export function provideYoutubeActivitiesList(): FactoryProvider {
  return {
    provide: YOUTUBE_ACTIVITIES_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeActivitiesListParams
          | (() => YoutubeActivitiesListParams | undefined),
      ) =>
        httpResource<YoutubeActivitiesListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/activities`,
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
