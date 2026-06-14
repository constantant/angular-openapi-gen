import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      configurationId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE');

export function provideCodeSecurityDeleteConfigurationForEnterprise(): FactoryProvider {
  return {
    provide: CODE_SECURITY_DELETE_CONFIGURATION_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string, configurationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/code-security/configurations/${configurationId}`,
          method: 'DELETE',
        }));
    },
  };
}
