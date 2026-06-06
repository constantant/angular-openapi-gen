import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposSetAdminBranchProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins']['post']['responses']['200']['content']['application/json'];

export const REPOS_SET_ADMIN_BRANCH_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposSetAdminBranchProtectionResponse>>
>('REPOS_SET_ADMIN_BRANCH_PROTECTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, branch: string) =>
      httpResource<ReposSetAdminBranchProtectionResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/enforce_admins`,
        method: 'POST',
      }));
  },
});
