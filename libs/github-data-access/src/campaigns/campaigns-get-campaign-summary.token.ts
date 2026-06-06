import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CampaignsGetCampaignSummaryResponse =
  paths['/orgs/{org}/campaigns/{campaign_number}']['get']['responses']['200']['content']['application/json'];

export const CAMPAIGNS_GET_CAMPAIGN_SUMMARY = new InjectionToken<
  (
    org: string,
    campaignNumber: string,
  ) => ReturnType<typeof httpResource<CampaignsGetCampaignSummaryResponse>>
>('CAMPAIGNS_GET_CAMPAIGN_SUMMARY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, campaignNumber: string) =>
      httpResource<CampaignsGetCampaignSummaryResponse>(() => ({
        url: `${base}/orgs/${org}/campaigns/${campaignNumber}`,
      }));
  },
});
