import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListParams = paths['/gists']['get']['parameters']['query'];

export type GistsListResponse =
  paths['/gists']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST = new InjectionToken<
  (
    params?: GistsListParams | (() => GistsListParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListResponse>>
>('GISTS_LIST');

export function provideGistsList(): FactoryProvider {
  return {
    provide: GISTS_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (params?: GistsListParams | (() => GistsListParams | undefined)) =>
        httpResource<GistsListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/gists`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
