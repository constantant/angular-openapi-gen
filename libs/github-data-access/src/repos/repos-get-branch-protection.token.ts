import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetBranchProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_BRANCH_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetBranchProtectionResponse>>
>('REPOS_GET_BRANCH_PROTECTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, branch: string) =>
      httpResource<ReposGetBranchProtectionResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection`,
      }));
  },
});
