import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateCommitCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/comments']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateCommitCommentResponse =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/comments']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commitSha: string,
    body: ReposCreateCommitCommentBody | Signal<ReposCreateCommitCommentBody>,
  ) => ReturnType<typeof httpResource<ReposCreateCommitCommentResponse>>
>('REPOS_CREATE_COMMIT_COMMENT');

export function provideReposCreateCommitComment(): FactoryProvider {
  return {
    provide: REPOS_CREATE_COMMIT_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commitSha: string,
        body:
          | ReposCreateCommitCommentBody
          | Signal<ReposCreateCommitCommentBody>,
      ) =>
        httpResource<ReposCreateCommitCommentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/commits/${commitSha}/comments`,
          method: 'POST',
          body,
        }));
    },
  };
}
