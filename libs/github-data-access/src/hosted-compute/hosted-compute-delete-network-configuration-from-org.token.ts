import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const HOSTED_COMPUTE_DELETE_NETWORK_CONFIGURATION_FROM_ORG =
  new InjectionToken<
    (
      org: string,
      networkConfigurationId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('HOSTED_COMPUTE_DELETE_NETWORK_CONFIGURATION_FROM_ORG');

export function provideHostedComputeDeleteNetworkConfigurationFromOrg(): FactoryProvider {
  return {
    provide: HOSTED_COMPUTE_DELETE_NETWORK_CONFIGURATION_FROM_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, networkConfigurationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/settings/network-configurations/${networkConfigurationId}`,
          method: 'DELETE',
        }));
    },
  };
}
