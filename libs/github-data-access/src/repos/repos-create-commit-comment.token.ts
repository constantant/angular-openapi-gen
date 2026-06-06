import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCreateCommitCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/comments']['post']['requestBody']
>['content']['application/json'];

type ReposCreateCommitCommentResponse =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/comments']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commit_sha: string,
    body: ReposCreateCommitCommentBody | Signal<ReposCreateCommitCommentBody>,
  ) => ReturnType<typeof httpResource<ReposCreateCommitCommentResponse>>
>('REPOS_CREATE_COMMIT_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      commit_sha: string,
      body: ReposCreateCommitCommentBody | Signal<ReposCreateCommitCommentBody>,
    ) =>
      httpResource<ReposCreateCommitCommentResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/commits/${commit_sha}/comments`,
        method: 'POST',
        body,
      }));
  },
});
