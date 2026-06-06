import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CampaignsListOrgCampaignsParams =
  paths['/orgs/{org}/campaigns']['get']['parameters']['query'];

export type CampaignsListOrgCampaignsResponse =
  paths['/orgs/{org}/campaigns']['get']['responses']['200']['content']['application/json'];

export const CAMPAIGNS_LIST_ORG_CAMPAIGNS = new InjectionToken<
  (
    org: string,
    params?:
      | CampaignsListOrgCampaignsParams
      | (() => CampaignsListOrgCampaignsParams | undefined),
  ) => ReturnType<typeof httpResource<CampaignsListOrgCampaignsResponse>>
>('CAMPAIGNS_LIST_ORG_CAMPAIGNS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | CampaignsListOrgCampaignsParams
        | (() => CampaignsListOrgCampaignsParams | undefined),
    ) =>
      httpResource<CampaignsListOrgCampaignsResponse>(() => ({
        url: `${base}/orgs/${org}/campaigns`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
