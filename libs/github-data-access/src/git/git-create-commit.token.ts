import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitCreateCommitBody = NonNullable<
  paths['/repos/{owner}/{repo}/git/commits']['post']['requestBody']
>['content']['application/json'];

export type GitCreateCommitResponse =
  paths['/repos/{owner}/{repo}/git/commits']['post']['responses']['201']['content']['application/json'];

export const GIT_CREATE_COMMIT = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: GitCreateCommitBody | Signal<GitCreateCommitBody>,
  ) => ReturnType<typeof httpResource<GitCreateCommitResponse>>
>('GIT_CREATE_COMMIT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: GitCreateCommitBody | Signal<GitCreateCommitBody>,
    ) =>
      httpResource<GitCreateCommitResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/git/commits`,
        method: 'POST',
        body,
      }));
  },
});
