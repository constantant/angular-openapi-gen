import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecurityAdvisoriesUpdateRepositoryAdvisoryBody = NonNullable<
  paths['/repos/{owner}/{repo}/security-advisories/{ghsa_id}']['patch']['requestBody']
>['content']['application/json'];

export type SecurityAdvisoriesUpdateRepositoryAdvisoryResponse =
  paths['/repos/{owner}/{repo}/security-advisories/{ghsa_id}']['patch']['responses']['200']['content']['application/json'];

export const SECURITY_ADVISORIES_UPDATE_REPOSITORY_ADVISORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      ghsaId: string,
      body:
        | SecurityAdvisoriesUpdateRepositoryAdvisoryBody
        | Signal<SecurityAdvisoriesUpdateRepositoryAdvisoryBody>,
    ) => ReturnType<
      typeof httpResource<SecurityAdvisoriesUpdateRepositoryAdvisoryResponse>
    >
  >('SECURITY_ADVISORIES_UPDATE_REPOSITORY_ADVISORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        ghsaId: string,
        body:
          | SecurityAdvisoriesUpdateRepositoryAdvisoryBody
          | Signal<SecurityAdvisoriesUpdateRepositoryAdvisoryBody>,
      ) =>
        httpResource<SecurityAdvisoriesUpdateRepositoryAdvisoryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/security-advisories/${ghsaId}`,
            method: 'PATCH',
            body,
          }),
        );
    },
  });
