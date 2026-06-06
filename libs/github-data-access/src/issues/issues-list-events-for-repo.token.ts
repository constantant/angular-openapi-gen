import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListEventsForRepoParams =
  paths['/repos/{owner}/{repo}/issues/events']['get']['parameters']['query'];

export type IssuesListEventsForRepoResponse =
  paths['/repos/{owner}/{repo}/issues/events']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_EVENTS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | IssuesListEventsForRepoParams
      | (() => IssuesListEventsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListEventsForRepoResponse>>
>('ISSUES_LIST_EVENTS_FOR_REPO');

export function provideIssuesListEventsForRepo(): FactoryProvider {
  return {
    provide: ISSUES_LIST_EVENTS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | IssuesListEventsForRepoParams
          | (() => IssuesListEventsForRepoParams | undefined),
      ) =>
        httpResource<IssuesListEventsForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/events`,
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
