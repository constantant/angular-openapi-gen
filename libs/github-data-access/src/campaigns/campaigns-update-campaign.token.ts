import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CampaignsUpdateCampaignBody = NonNullable<
  paths['/orgs/{org}/campaigns/{campaign_number}']['patch']['requestBody']
>['content']['application/json'];

export type CampaignsUpdateCampaignResponse =
  paths['/orgs/{org}/campaigns/{campaign_number}']['patch']['responses']['200']['content']['application/json'];

export const CAMPAIGNS_UPDATE_CAMPAIGN = new InjectionToken<
  (
    org: string,
    campaignNumber: string,
    body: CampaignsUpdateCampaignBody | Signal<CampaignsUpdateCampaignBody>,
  ) => ReturnType<typeof httpResource<CampaignsUpdateCampaignResponse>>
>('CAMPAIGNS_UPDATE_CAMPAIGN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      campaignNumber: string,
      body: CampaignsUpdateCampaignBody | Signal<CampaignsUpdateCampaignBody>,
    ) =>
      httpResource<CampaignsUpdateCampaignResponse>(() => ({
        url: `${base}/orgs/${org}/campaigns/${campaignNumber}`,
        method: 'PATCH',
        body,
      }));
  },
});
