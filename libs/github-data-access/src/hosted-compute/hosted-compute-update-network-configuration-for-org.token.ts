import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type HostedComputeUpdateNetworkConfigurationForOrgBody = NonNullable<
  paths['/orgs/{org}/settings/network-configurations/{network_configuration_id}']['patch']['requestBody']
>['content']['application/json'];

export type HostedComputeUpdateNetworkConfigurationForOrgResponse =
  paths['/orgs/{org}/settings/network-configurations/{network_configuration_id}']['patch']['responses']['200']['content']['application/json'];

export const HOSTED_COMPUTE_UPDATE_NETWORK_CONFIGURATION_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      networkConfigurationId: string,
      body:
        | HostedComputeUpdateNetworkConfigurationForOrgBody
        | Signal<HostedComputeUpdateNetworkConfigurationForOrgBody>,
    ) => ReturnType<
      typeof httpResource<HostedComputeUpdateNetworkConfigurationForOrgResponse>
    >
  >('HOSTED_COMPUTE_UPDATE_NETWORK_CONFIGURATION_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        networkConfigurationId: string,
        body:
          | HostedComputeUpdateNetworkConfigurationForOrgBody
          | Signal<HostedComputeUpdateNetworkConfigurationForOrgBody>,
      ) =>
        httpResource<HostedComputeUpdateNetworkConfigurationForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/settings/network-configurations/${networkConfigurationId}`,
            method: 'PATCH',
            body,
          }),
        );
    },
  });
