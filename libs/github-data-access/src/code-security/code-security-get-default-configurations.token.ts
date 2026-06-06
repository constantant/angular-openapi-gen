import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetDefaultConfigurationsResponse =
  paths['/orgs/{org}/code-security/configurations/defaults']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<CodeSecurityGetDefaultConfigurationsResponse>
  >
>('CODE_SECURITY_GET_DEFAULT_CONFIGURATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<CodeSecurityGetDefaultConfigurationsResponse>(() => ({
        url: `${base}/orgs/${org}/code-security/configurations/defaults`,
      }));
  },
});
