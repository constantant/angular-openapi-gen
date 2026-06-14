import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListParams = paths['/issues']['get']['parameters']['query'];

export type IssuesListResponse =
  paths['/issues']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST = new InjectionToken<
  (
    params?: IssuesListParams | (() => IssuesListParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListResponse>>
>('ISSUES_LIST');

export function provideIssuesList(): FactoryProvider {
  return {
    provide: ISSUES_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?: IssuesListParams | (() => IssuesListParams | undefined),
      ) =>
        httpResource<IssuesListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/issues`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
