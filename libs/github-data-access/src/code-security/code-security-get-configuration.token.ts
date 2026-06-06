import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetConfigurationResponse =
  paths['/orgs/{org}/code-security/configurations/{configuration_id}']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_CONFIGURATION = new InjectionToken<
  (
    org: string,
    configurationId: string,
  ) => ReturnType<typeof httpResource<CodeSecurityGetConfigurationResponse>>
>('CODE_SECURITY_GET_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, configurationId: string) =>
      httpResource<CodeSecurityGetConfigurationResponse>(() => ({
        url: `${base}/orgs/${org}/code-security/configurations/${configurationId}`,
      }));
  },
});
