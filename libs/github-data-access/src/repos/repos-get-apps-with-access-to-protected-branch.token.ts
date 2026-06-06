import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetAppsWithAccessToProtectedBranchResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_APPS_WITH_ACCESS_TO_PROTECTED_BRANCH =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      branch: string,
    ) => ReturnType<
      typeof httpResource<ReposGetAppsWithAccessToProtectedBranchResponse>
    >
  >('REPOS_GET_APPS_WITH_ACCESS_TO_PROTECTED_BRANCH', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetAppsWithAccessToProtectedBranchResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
        }));
    },
  });
