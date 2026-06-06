import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type HostedComputeCreateNetworkConfigurationForOrgBody = NonNullable<
  paths['/orgs/{org}/settings/network-configurations']['post']['requestBody']
>['content']['application/json'];

export type HostedComputeCreateNetworkConfigurationForOrgResponse =
  paths['/orgs/{org}/settings/network-configurations']['post']['responses']['201']['content']['application/json'];

export const HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      body:
        | HostedComputeCreateNetworkConfigurationForOrgBody
        | Signal<HostedComputeCreateNetworkConfigurationForOrgBody>,
    ) => ReturnType<
      typeof httpResource<HostedComputeCreateNetworkConfigurationForOrgResponse>
    >
  >('HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG');

export function provideHostedComputeCreateNetworkConfigurationForOrg(): FactoryProvider {
  return {
    provide: HOSTED_COMPUTE_CREATE_NETWORK_CONFIGURATION_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | HostedComputeCreateNetworkConfigurationForOrgBody
          | Signal<HostedComputeCreateNetworkConfigurationForOrgBody>,
      ) =>
        httpResource<HostedComputeCreateNetworkConfigurationForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/settings/network-configurations`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
