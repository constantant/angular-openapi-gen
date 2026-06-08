import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SearchTopicsParams =
  paths['/search/topics']['get']['parameters']['query'];

export type SearchTopicsResponse =
  paths['/search/topics']['get']['responses']['200']['content']['application/json'];

export const SEARCH_TOPICS = new InjectionToken<
  (
    params?: SearchTopicsParams | (() => SearchTopicsParams | undefined),
  ) => ReturnType<typeof httpResource<SearchTopicsResponse>>
>('SEARCH_TOPICS');

export function provideSearchTopics(): FactoryProvider {
  return {
    provide: SEARCH_TOPICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?: SearchTopicsParams | (() => SearchTopicsParams | undefined),
      ) =>
        httpResource<SearchTopicsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/search/topics`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
