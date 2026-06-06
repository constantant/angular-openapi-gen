import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityAttachEnterpriseConfigurationBody = NonNullable<
  paths['/enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach']['post']['requestBody']
>['content']['application/json'];

export const CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION = new InjectionToken<
  (
    enterprise: string,
    configurationId: string,
    body:
      | CodeSecurityAttachEnterpriseConfigurationBody
      | Signal<CodeSecurityAttachEnterpriseConfigurationBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODE_SECURITY_ATTACH_ENTERPRISE_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      enterprise: string,
      configurationId: string,
      body:
        | CodeSecurityAttachEnterpriseConfigurationBody
        | Signal<CodeSecurityAttachEnterpriseConfigurationBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/enterprises/${enterprise}/code-security/configurations/${configurationId}/attach`,
        method: 'POST',
        body,
      }));
  },
});
