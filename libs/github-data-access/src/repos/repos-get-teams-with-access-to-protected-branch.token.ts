import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetTeamsWithAccessToProtectedBranchResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_TEAMS_WITH_ACCESS_TO_PROTECTED_BRANCH =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      branch: string,
    ) => ReturnType<
      typeof httpResource<ReposGetTeamsWithAccessToProtectedBranchResponse>
    >
  >('REPOS_GET_TEAMS_WITH_ACCESS_TO_PROTECTED_BRANCH', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetTeamsWithAccessToProtectedBranchResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
        }));
    },
  });
