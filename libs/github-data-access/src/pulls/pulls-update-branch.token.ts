import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsUpdateBranchBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/update-branch']['put']['requestBody']
>['content']['application/json'];

export type PullsUpdateBranchResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/update-branch']['put']['responses']['202']['content']['application/json'];

export const PULLS_UPDATE_BRANCH = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    body: PullsUpdateBranchBody | Signal<PullsUpdateBranchBody>,
  ) => ReturnType<typeof httpResource<PullsUpdateBranchResponse>>
>('PULLS_UPDATE_BRANCH');

export function providePullsUpdateBranch(): FactoryProvider {
  return {
    provide: PULLS_UPDATE_BRANCH,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        body: PullsUpdateBranchBody | Signal<PullsUpdateBranchBody>,
      ) =>
        httpResource<PullsUpdateBranchResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/update-branch`,
          method: 'PUT',
          body,
        }));
    },
  };
}
