import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposMergeBody = NonNullable<
  paths['/repos/{owner}/{repo}/merges']['post']['requestBody']
>['content']['application/json'];

type ReposMergeResponse =
  paths['/repos/{owner}/{repo}/merges']['post']['responses']['201']['content']['application/json'];

export const REPOS_MERGE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposMergeBody | Signal<ReposMergeBody>,
  ) => ReturnType<typeof httpResource<ReposMergeResponse>>
>('REPOS_MERGE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ReposMergeBody | Signal<ReposMergeBody>,
    ) =>
      httpResource<ReposMergeResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/merges`,
        method: 'POST',
        body,
      }));
  },
});
