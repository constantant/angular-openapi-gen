import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CAMPAIGNS_DELETE_CAMPAIGN = new InjectionToken<
  (
    org: string,
    campaignNumber: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('CAMPAIGNS_DELETE_CAMPAIGN');

export function provideCampaignsDeleteCampaign(): FactoryProvider {
  return {
    provide: CAMPAIGNS_DELETE_CAMPAIGN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, campaignNumber: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/campaigns/${campaignNumber}`,
          method: 'DELETE',
        }));
    },
  };
}
