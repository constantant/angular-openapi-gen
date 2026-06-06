import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityAttachConfigurationBody = NonNullable<
  paths['/orgs/{org}/code-security/configurations/{configuration_id}/attach']['post']['requestBody']
>['content']['application/json'];

export const CODE_SECURITY_ATTACH_CONFIGURATION = new InjectionToken<
  (
    org: string,
    configurationId: string,
    body:
      | CodeSecurityAttachConfigurationBody
      | Signal<CodeSecurityAttachConfigurationBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODE_SECURITY_ATTACH_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      configurationId: string,
      body:
        | CodeSecurityAttachConfigurationBody
        | Signal<CodeSecurityAttachConfigurationBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/code-security/configurations/${configurationId}/attach`,
        method: 'POST',
        body,
      }));
  },
});
