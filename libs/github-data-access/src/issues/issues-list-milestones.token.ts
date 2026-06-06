import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListMilestonesParams =
  paths['/repos/{owner}/{repo}/milestones']['get']['parameters']['query'];

export type IssuesListMilestonesResponse =
  paths['/repos/{owner}/{repo}/milestones']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_MILESTONES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | IssuesListMilestonesParams
      | (() => IssuesListMilestonesParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListMilestonesResponse>>
>('ISSUES_LIST_MILESTONES');

export function provideIssuesListMilestones(): FactoryProvider {
  return {
    provide: ISSUES_LIST_MILESTONES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | IssuesListMilestonesParams
          | (() => IssuesListMilestonesParams | undefined),
      ) =>
        httpResource<IssuesListMilestonesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/milestones`,
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
