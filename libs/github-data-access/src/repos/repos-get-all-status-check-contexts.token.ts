import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetAllStatusCheckContextsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ALL_STATUS_CHECK_CONTEXTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetAllStatusCheckContextsResponse>>
>('REPOS_GET_ALL_STATUS_CHECK_CONTEXTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, branch: string) =>
      httpResource<ReposGetAllStatusCheckContextsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
      }));
  },
});
