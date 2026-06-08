import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_GET_CAMPAIGN_SUMMARY } from './campaigns-get-campaign-summary.token';
import type { CampaignsGetCampaignSummaryResponse } from './campaigns-get-campaign-summary.token';

export function provideCampaignsGetCampaignSummaryMock(
  initialBehavior?: ProviderInitialBehavior<CampaignsGetCampaignSummaryResponse>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_GET_CAMPAIGN_SUMMARY,
    'CAMPAIGNS_GET_CAMPAIGN_SUMMARY',
    initialBehavior,
  );
}
