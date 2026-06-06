import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityCreateConfigurationBody = NonNullable<
  paths['/orgs/{org}/code-security/configurations']['post']['requestBody']
>['content']['application/json'];

export type CodeSecurityCreateConfigurationResponse =
  paths['/orgs/{org}/code-security/configurations']['post']['responses']['201']['content']['application/json'];

export const CODE_SECURITY_CREATE_CONFIGURATION = new InjectionToken<
  (
    org: string,
    body:
      | CodeSecurityCreateConfigurationBody
      | Signal<CodeSecurityCreateConfigurationBody>,
  ) => ReturnType<typeof httpResource<CodeSecurityCreateConfigurationResponse>>
>('CODE_SECURITY_CREATE_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | CodeSecurityCreateConfigurationBody
        | Signal<CodeSecurityCreateConfigurationBody>,
    ) =>
      httpResource<CodeSecurityCreateConfigurationResponse>(() => ({
        url: `${base}/orgs/${org}/code-security/configurations`,
        method: 'POST',
        body,
      }));
  },
});
