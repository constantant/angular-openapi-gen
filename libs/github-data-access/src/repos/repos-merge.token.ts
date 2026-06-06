import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposMergeBody = NonNullable<
  paths['/repos/{owner}/{repo}/merges']['post']['requestBody']
>['content']['application/json'];

export type ReposMergeResponse =
  paths['/repos/{owner}/{repo}/merges']['post']['responses']['201']['content']['application/json'];

export const REPOS_MERGE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposMergeBody | Signal<ReposMergeBody>,
  ) => ReturnType<typeof httpResource<ReposMergeResponse>>
>('REPOS_MERGE');

export function provideReposMerge(): FactoryProvider {
  return {
    provide: REPOS_MERGE,
    useFactory: () => {
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
  };
}
