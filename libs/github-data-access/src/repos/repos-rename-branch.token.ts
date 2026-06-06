import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRenameBranchBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/rename']['post']['requestBody']
>['content']['application/json'];

export type ReposRenameBranchResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/rename']['post']['responses']['201']['content']['application/json'];

export const REPOS_RENAME_BRANCH = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body: ReposRenameBranchBody | Signal<ReposRenameBranchBody>,
  ) => ReturnType<typeof httpResource<ReposRenameBranchResponse>>
>('REPOS_RENAME_BRANCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body: ReposRenameBranchBody | Signal<ReposRenameBranchBody>,
    ) =>
      httpResource<ReposRenameBranchResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/rename`,
        method: 'POST',
        body,
      }));
  },
});
