import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type HostedComputeGetNetworkConfigurationForOrgResponse =
  paths['/orgs/{org}/settings/network-configurations/{network_configuration_id}']['get']['responses']['200']['content']['application/json'];

export const HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      networkConfigurationId: string,
    ) => ReturnType<
      typeof httpResource<HostedComputeGetNetworkConfigurationForOrgResponse>
    >
  >('HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG');

export function provideHostedComputeGetNetworkConfigurationForOrg(): FactoryProvider {
  return {
    provide: HOSTED_COMPUTE_GET_NETWORK_CONFIGURATION_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, networkConfigurationId: string) =>
        httpResource<HostedComputeGetNetworkConfigurationForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/settings/network-configurations/${networkConfigurationId}`,
          }),
        );
    },
  };
}
