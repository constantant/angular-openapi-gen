import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetStatusChecksProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_STATUS_CHECKS_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetStatusChecksProtectionResponse>>
>('REPOS_GET_STATUS_CHECKS_PROTECTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, branch: string) =>
      httpResource<ReposGetStatusChecksProtectionResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
      }));
  },
});
