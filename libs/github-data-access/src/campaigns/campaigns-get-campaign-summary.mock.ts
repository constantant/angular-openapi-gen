import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_GET_CAMPAIGN_SUMMARY } from './campaigns-get-campaign-summary.token';
import type { CampaignsGetCampaignSummaryResponse } from './campaigns-get-campaign-summary.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'campaigns/get-campaign-summary',
  path: '/orgs/{org}/campaigns/{campaign_number}',
  method: 'get',
  tag: 'campaigns',
};

export function provideCampaignsGetCampaignSummaryMock(
  initialBehavior?: ProviderInitialBehavior<CampaignsGetCampaignSummaryResponse>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_GET_CAMPAIGN_SUMMARY,
    'CAMPAIGNS_GET_CAMPAIGN_SUMMARY',
    initialBehavior,
    _meta,
  );
}
