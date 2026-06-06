import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeMembershipsLevelsListParams =
  paths['/youtube/v3/membershipsLevels']['get']['parameters']['query'];

export type YoutubeMembershipsLevelsListResponse =
  paths['/youtube/v3/membershipsLevels']['get']['responses']['200']['content']['application/json'];

export const YOUTUBE_MEMBERSHIPS_LEVELS_LIST = new InjectionToken<
  (
    params?:
      | YoutubeMembershipsLevelsListParams
      | (() => YoutubeMembershipsLevelsListParams | undefined),
  ) => ReturnType<typeof httpResource<YoutubeMembershipsLevelsListResponse>>
>('YOUTUBE_MEMBERSHIPS_LEVELS_LIST');

export function provideYoutubeMembershipsLevelsList(): FactoryProvider {
  return {
    provide: YOUTUBE_MEMBERSHIPS_LEVELS_LIST,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        params?:
          | YoutubeMembershipsLevelsListParams
          | (() => YoutubeMembershipsLevelsListParams | undefined),
      ) =>
        httpResource<YoutubeMembershipsLevelsListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/youtube/v3/membershipsLevels`,
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
