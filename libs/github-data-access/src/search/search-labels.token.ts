import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SearchLabelsParams =
  paths['/search/labels']['get']['parameters']['query'];

export type SearchLabelsResponse =
  paths['/search/labels']['get']['responses']['200']['content']['application/json'];

export const SEARCH_LABELS = new InjectionToken<
  (
    params?: SearchLabelsParams | (() => SearchLabelsParams | undefined),
  ) => ReturnType<typeof httpResource<SearchLabelsResponse>>
>('SEARCH_LABELS');

export function provideSearchLabels(): FactoryProvider {
  return {
    provide: SEARCH_LABELS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?: SearchLabelsParams | (() => SearchLabelsParams | undefined),
      ) =>
        httpResource<SearchLabelsResponse>(() => ({
          url: `${base}/search/labels`,
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
