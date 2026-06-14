import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListForksParams =
  paths['/gists/{gist_id}/forks']['get']['parameters']['query'];

export type GistsListForksResponse =
  paths['/gists/{gist_id}/forks']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST_FORKS = new InjectionToken<
  (
    gistId: string,
    params?: GistsListForksParams | (() => GistsListForksParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListForksResponse>>
>('GISTS_LIST_FORKS');

export function provideGistsListForks(): FactoryProvider {
  return {
    provide: GISTS_LIST_FORKS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        gistId: string,
        params?:
          | GistsListForksParams
          | (() => GistsListForksParams | undefined),
      ) =>
        httpResource<GistsListForksResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/gists/${gistId}/forks`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
