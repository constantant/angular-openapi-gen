import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecurityAdvisoriesGetRepositoryAdvisoryResponse =
  paths['/repos/{owner}/{repo}/security-advisories/{ghsa_id}']['get']['responses']['200']['content']['application/json'];

export const SECURITY_ADVISORIES_GET_REPOSITORY_ADVISORY = new InjectionToken<
  (
    owner: string,
    repo: string,
    ghsaId: string,
  ) => ReturnType<
    typeof httpResource<SecurityAdvisoriesGetRepositoryAdvisoryResponse>
  >
>('SECURITY_ADVISORIES_GET_REPOSITORY_ADVISORY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, ghsaId: string) =>
      httpResource<SecurityAdvisoriesGetRepositoryAdvisoryResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/security-advisories/${ghsaId}`,
      }));
  },
});
