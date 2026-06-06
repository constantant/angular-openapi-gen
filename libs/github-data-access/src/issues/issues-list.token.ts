import { InjectionToken, inject } from '@angular/core';
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
>('ISSUES_LIST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: IssuesListParams | (() => IssuesListParams | undefined)) =>
      httpResource<IssuesListResponse>(() => ({
        url: `${base}/issues`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
