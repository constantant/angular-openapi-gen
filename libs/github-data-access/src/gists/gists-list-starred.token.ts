import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListStarredParams =
  paths['/gists/starred']['get']['parameters']['query'];

export type GistsListStarredResponse =
  paths['/gists/starred']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST_STARRED = new InjectionToken<
  (
    params?:
      | GistsListStarredParams
      | (() => GistsListStarredParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListStarredResponse>>
>('GISTS_LIST_STARRED');

export function provideGistsListStarred(): FactoryProvider {
  return {
    provide: GISTS_LIST_STARRED,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | GistsListStarredParams
          | (() => GistsListStarredParams | undefined),
      ) =>
        httpResource<GistsListStarredResponse>(() => ({
          url: `${base}/gists/starred`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
