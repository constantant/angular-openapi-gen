import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecuritySetConfigurationAsDefaultBody = NonNullable<
  paths['/orgs/{org}/code-security/configurations/{configuration_id}/defaults']['put']['requestBody']
>['content']['application/json'];

export type CodeSecuritySetConfigurationAsDefaultResponse =
  paths['/orgs/{org}/code-security/configurations/{configuration_id}/defaults']['put']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT = new InjectionToken<
  (
    org: string,
    configurationId: string,
    body:
      | CodeSecuritySetConfigurationAsDefaultBody
      | Signal<CodeSecuritySetConfigurationAsDefaultBody>,
  ) => ReturnType<
    typeof httpResource<CodeSecuritySetConfigurationAsDefaultResponse>
  >
>('CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT');

export function provideCodeSecuritySetConfigurationAsDefault(): FactoryProvider {
  return {
    provide: CODE_SECURITY_SET_CONFIGURATION_AS_DEFAULT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        configurationId: string,
        body:
          | CodeSecuritySetConfigurationAsDefaultBody
          | Signal<CodeSecuritySetConfigurationAsDefaultBody>,
      ) =>
        httpResource<CodeSecuritySetConfigurationAsDefaultResponse>(() => ({
          url: `${base}/orgs/${org}/code-security/configurations/${configurationId}/defaults`,
          method: 'PUT',
          body,
        }));
    },
  };
}
