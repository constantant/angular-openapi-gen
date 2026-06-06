import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetConfigurationForRepositoryResponse =
  paths['/repos/{owner}/{repo}/code-security-configuration']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_CONFIGURATION_FOR_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
    ) => ReturnType<
      typeof httpResource<CodeSecurityGetConfigurationForRepositoryResponse>
    >
  >('CODE_SECURITY_GET_CONFIGURATION_FOR_REPOSITORY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<CodeSecurityGetConfigurationForRepositoryResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-security-configuration`,
        }));
    },
  });
