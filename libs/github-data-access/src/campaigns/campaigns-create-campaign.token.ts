import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CampaignsCreateCampaignBody = NonNullable<
  paths['/orgs/{org}/campaigns']['post']['requestBody']
>['content']['application/json'];

export type CampaignsCreateCampaignResponse =
  paths['/orgs/{org}/campaigns']['post']['responses']['200']['content']['application/json'];

export const CAMPAIGNS_CREATE_CAMPAIGN = new InjectionToken<
  (
    org: string,
    body: CampaignsCreateCampaignBody | Signal<CampaignsCreateCampaignBody>,
  ) => ReturnType<typeof httpResource<CampaignsCreateCampaignResponse>>
>('CAMPAIGNS_CREATE_CAMPAIGN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body: CampaignsCreateCampaignBody | Signal<CampaignsCreateCampaignBody>,
    ) =>
      httpResource<CampaignsCreateCampaignResponse>(() => ({
        url: `${base}/orgs/${org}/campaigns`,
        method: 'POST',
        body,
      }));
  },
});
