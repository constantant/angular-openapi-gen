import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetConfigurationsForOrgParams =
  paths['/orgs/{org}/code-security/configurations']['get']['parameters']['query'];

export type CodeSecurityGetConfigurationsForOrgResponse =
  paths['/orgs/{org}/code-security/configurations']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_CONFIGURATIONS_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | CodeSecurityGetConfigurationsForOrgParams
      | (() => CodeSecurityGetConfigurationsForOrgParams | undefined),
  ) => ReturnType<
    typeof httpResource<CodeSecurityGetConfigurationsForOrgResponse>
  >
>('CODE_SECURITY_GET_CONFIGURATIONS_FOR_ORG');

export function provideCodeSecurityGetConfigurationsForOrg(): FactoryProvider {
  return {
    provide: CODE_SECURITY_GET_CONFIGURATIONS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | CodeSecurityGetConfigurationsForOrgParams
          | (() => CodeSecurityGetConfigurationsForOrgParams | undefined),
      ) =>
        httpResource<CodeSecurityGetConfigurationsForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/code-security/configurations`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
