import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListBranchesForHeadCommitResponse =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commitSha: string,
  ) => ReturnType<typeof httpResource<ReposListBranchesForHeadCommitResponse>>
>('REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT');

export function provideReposListBranchesForHeadCommit(): FactoryProvider {
  return {
    provide: REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, commitSha: string) =>
        httpResource<ReposListBranchesForHeadCommitResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/commits/${commitSha}/branches-where-head`,
        }));
    },
  };
}
