import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SearchCodeParams =
  paths['/search/code']['get']['parameters']['query'];

export type SearchCodeResponse =
  paths['/search/code']['get']['responses']['200']['content']['application/json'];

export const SEARCH_CODE = new InjectionToken<
  (
    params?: SearchCodeParams | (() => SearchCodeParams | undefined),
  ) => ReturnType<typeof httpResource<SearchCodeResponse>>
>('SEARCH_CODE');

export function provideSearchCode(): FactoryProvider {
  return {
    provide: SEARCH_CODE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?: SearchCodeParams | (() => SearchCodeParams | undefined),
      ) =>
        httpResource<SearchCodeResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/search/code`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
