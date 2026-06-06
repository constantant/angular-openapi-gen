import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateCommitStatusBody = NonNullable<
  paths['/repos/{owner}/{repo}/statuses/{sha}']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateCommitStatusResponse =
  paths['/repos/{owner}/{repo}/statuses/{sha}']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_COMMIT_STATUS = new InjectionToken<
  (
    owner: string,
    repo: string,
    sha: string,
    body: ReposCreateCommitStatusBody | Signal<ReposCreateCommitStatusBody>,
  ) => ReturnType<typeof httpResource<ReposCreateCommitStatusResponse>>
>('REPOS_CREATE_COMMIT_STATUS');

export function provideReposCreateCommitStatus(): FactoryProvider {
  return {
    provide: REPOS_CREATE_COMMIT_STATUS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        sha: string,
        body: ReposCreateCommitStatusBody | Signal<ReposCreateCommitStatusBody>,
      ) =>
        httpResource<ReposCreateCommitStatusResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/statuses/${sha}`,
          method: 'POST',
          body,
        }));
    },
  };
}
