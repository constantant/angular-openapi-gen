import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityAttachConfigurationBody = NonNullable<
  paths['/orgs/{org}/code-security/configurations/{configuration_id}/attach']['post']['requestBody']
>['content']['application/json'];

export type CodeSecurityAttachConfigurationResponse =
  paths['/orgs/{org}/code-security/configurations/{configuration_id}/attach']['post']['responses']['202']['content']['application/json'];

export const CODE_SECURITY_ATTACH_CONFIGURATION = new InjectionToken<
  (
    org: string,
    configurationId: string,
    body:
      | CodeSecurityAttachConfigurationBody
      | Signal<CodeSecurityAttachConfigurationBody>,
  ) => ReturnType<typeof httpResource<CodeSecurityAttachConfigurationResponse>>
>('CODE_SECURITY_ATTACH_CONFIGURATION');

export function provideCodeSecurityAttachConfiguration(): FactoryProvider {
  return {
    provide: CODE_SECURITY_ATTACH_CONFIGURATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        configurationId: string,
        body:
          | CodeSecurityAttachConfigurationBody
          | Signal<CodeSecurityAttachConfigurationBody>,
      ) =>
        httpResource<CodeSecurityAttachConfigurationResponse>(() => ({
          url: `${base}/orgs/${org}/code-security/configurations/${configurationId}/attach`,
          method: 'POST',
          body,
        }));
    },
  };
}
