import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListLabelsForRepoParams =
  paths['/repos/{owner}/{repo}/labels']['get']['parameters']['query'];

export type IssuesListLabelsForRepoResponse =
  paths['/repos/{owner}/{repo}/labels']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_LABELS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | IssuesListLabelsForRepoParams
      | (() => IssuesListLabelsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListLabelsForRepoResponse>>
>('ISSUES_LIST_LABELS_FOR_REPO');

export function provideIssuesListLabelsForRepo(): FactoryProvider {
  return {
    provide: ISSUES_LIST_LABELS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | IssuesListLabelsForRepoParams
          | (() => IssuesListLabelsForRepoParams | undefined),
      ) =>
        httpResource<IssuesListLabelsForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/labels`,
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
