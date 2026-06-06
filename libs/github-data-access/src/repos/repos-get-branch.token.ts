import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetBranchResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_BRANCH = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetBranchResponse>>
>('REPOS_GET_BRANCH');

export function provideReposGetBranch(): FactoryProvider {
  return {
    provide: REPOS_GET_BRANCH,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetBranchResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}`,
        }));
    },
  };
}
