import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposMergeUpstreamBody = NonNullable<
  paths['/repos/{owner}/{repo}/merge-upstream']['post']['requestBody']
>['content']['application/json'];

export type ReposMergeUpstreamResponse =
  paths['/repos/{owner}/{repo}/merge-upstream']['post']['responses']['200']['content']['application/json'];

export const REPOS_MERGE_UPSTREAM = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposMergeUpstreamBody | Signal<ReposMergeUpstreamBody>,
  ) => ReturnType<typeof httpResource<ReposMergeUpstreamResponse>>
>('REPOS_MERGE_UPSTREAM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ReposMergeUpstreamBody | Signal<ReposMergeUpstreamBody>,
    ) =>
      httpResource<ReposMergeUpstreamResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/merge-upstream`,
        method: 'POST',
        body,
      }));
  },
});
