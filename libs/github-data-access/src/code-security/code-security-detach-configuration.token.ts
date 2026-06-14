import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityDetachConfigurationBody = NonNullable<
  paths['/orgs/{org}/code-security/configurations/detach']['delete']['requestBody']
>['content']['application/json'];

export const CODE_SECURITY_DETACH_CONFIGURATION = new InjectionToken<
  (
    org: string,
    body:
      | CodeSecurityDetachConfigurationBody
      | Signal<CodeSecurityDetachConfigurationBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODE_SECURITY_DETACH_CONFIGURATION');

export function provideCodeSecurityDetachConfiguration(): FactoryProvider {
  return {
    provide: CODE_SECURITY_DETACH_CONFIGURATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CodeSecurityDetachConfigurationBody
          | Signal<CodeSecurityDetachConfigurationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/code-security/configurations/detach`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
