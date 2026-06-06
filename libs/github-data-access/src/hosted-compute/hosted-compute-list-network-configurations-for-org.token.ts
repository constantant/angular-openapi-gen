import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type HostedComputeListNetworkConfigurationsForOrgParams =
  paths['/orgs/{org}/settings/network-configurations']['get']['parameters']['query'];

export type HostedComputeListNetworkConfigurationsForOrgResponse =
  paths['/orgs/{org}/settings/network-configurations']['get']['responses']['200']['content']['application/json'];

export const HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      params?:
        | HostedComputeListNetworkConfigurationsForOrgParams
        | (() =>
            | HostedComputeListNetworkConfigurationsForOrgParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<HostedComputeListNetworkConfigurationsForOrgResponse>
    >
  >('HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG');

export function provideHostedComputeListNetworkConfigurationsForOrg(): FactoryProvider {
  return {
    provide: HOSTED_COMPUTE_LIST_NETWORK_CONFIGURATIONS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | HostedComputeListNetworkConfigurationsForOrgParams
          | (() =>
              | HostedComputeListNetworkConfigurationsForOrgParams
              | undefined),
      ) =>
        httpResource<HostedComputeListNetworkConfigurationsForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/settings/network-configurations`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
