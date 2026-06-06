import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type HostedComputeGetNetworkSettingsForOrgResponse =
  paths['/orgs/{org}/settings/network-settings/{network_settings_id}']['get']['responses']['200']['content']['application/json'];

export const HOSTED_COMPUTE_GET_NETWORK_SETTINGS_FOR_ORG = new InjectionToken<
  (
    org: string,
    networkSettingsId: string,
  ) => ReturnType<
    typeof httpResource<HostedComputeGetNetworkSettingsForOrgResponse>
  >
>('HOSTED_COMPUTE_GET_NETWORK_SETTINGS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, networkSettingsId: string) =>
      httpResource<HostedComputeGetNetworkSettingsForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/settings/network-settings/${networkSettingsId}`,
      }));
  },
});
