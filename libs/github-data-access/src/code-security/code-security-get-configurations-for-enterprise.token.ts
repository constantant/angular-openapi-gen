import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeSecurityGetConfigurationsForEnterpriseParams =
  paths['/enterprises/{enterprise}/code-security/configurations']['get']['parameters']['query'];

export type CodeSecurityGetConfigurationsForEnterpriseResponse =
  paths['/enterprises/{enterprise}/code-security/configurations']['get']['responses']['200']['content']['application/json'];

export const CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      params?:
        | CodeSecurityGetConfigurationsForEnterpriseParams
        | (() => CodeSecurityGetConfigurationsForEnterpriseParams | undefined),
    ) => ReturnType<
      typeof httpResource<CodeSecurityGetConfigurationsForEnterpriseResponse>
    >
  >('CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE');

export function provideCodeSecurityGetConfigurationsForEnterprise(): FactoryProvider {
  return {
    provide: CODE_SECURITY_GET_CONFIGURATIONS_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        params?:
          | CodeSecurityGetConfigurationsForEnterpriseParams
          | (() =>
              | CodeSecurityGetConfigurationsForEnterpriseParams
              | undefined),
      ) =>
        httpResource<CodeSecurityGetConfigurationsForEnterpriseResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/enterprises/${enterprise}/code-security/configurations`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
