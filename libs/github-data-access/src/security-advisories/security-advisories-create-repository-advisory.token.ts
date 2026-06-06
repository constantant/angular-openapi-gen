import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecurityAdvisoriesCreateRepositoryAdvisoryBody = NonNullable<
  paths['/repos/{owner}/{repo}/security-advisories']['post']['requestBody']
>['content']['application/json'];

export type SecurityAdvisoriesCreateRepositoryAdvisoryResponse =
  paths['/repos/{owner}/{repo}/security-advisories']['post']['responses']['201']['content']['application/json'];

export const SECURITY_ADVISORIES_CREATE_REPOSITORY_ADVISORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | SecurityAdvisoriesCreateRepositoryAdvisoryBody
        | Signal<SecurityAdvisoriesCreateRepositoryAdvisoryBody>,
    ) => ReturnType<
      typeof httpResource<SecurityAdvisoriesCreateRepositoryAdvisoryResponse>
    >
  >('SECURITY_ADVISORIES_CREATE_REPOSITORY_ADVISORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | SecurityAdvisoriesCreateRepositoryAdvisoryBody
          | Signal<SecurityAdvisoriesCreateRepositoryAdvisoryBody>,
      ) =>
        httpResource<SecurityAdvisoriesCreateRepositoryAdvisoryResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/security-advisories`,
            method: 'POST',
            body,
          }),
        );
    },
  });
