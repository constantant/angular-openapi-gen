import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityUpdateConfigurationBody = NonNullable<
  paths['/orgs/{org}/code-security/configurations/{configuration_id}']['patch']['requestBody']
>['content']['application/json'];

export type CodeSecurityUpdateConfigurationResponse =
  paths['/orgs/{org}/code-security/configurations/{configuration_id}']['patch']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_UPDATE_CONFIGURATION = new InjectionToken<
  (
    org: string,
    configurationId: string,
    body:
      | CodeSecurityUpdateConfigurationBody
      | Signal<CodeSecurityUpdateConfigurationBody>,
  ) => ReturnType<typeof httpResource<CodeSecurityUpdateConfigurationResponse>>
>('CODE_SECURITY_UPDATE_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      configurationId: string,
      body:
        | CodeSecurityUpdateConfigurationBody
        | Signal<CodeSecurityUpdateConfigurationBody>,
    ) =>
      httpResource<CodeSecurityUpdateConfigurationResponse>(() => ({
        url: `${base}/orgs/${org}/code-security/configurations/${configurationId}`,
        method: 'PATCH',
        body,
      }));
  },
});
