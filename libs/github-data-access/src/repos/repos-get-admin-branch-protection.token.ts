import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetAdminBranchProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ADMIN_BRANCH_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetAdminBranchProtectionResponse>>
>('REPOS_GET_ADMIN_BRANCH_PROTECTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, branch: string) =>
      httpResource<ReposGetAdminBranchProtectionResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`,
      }));
  },
});
