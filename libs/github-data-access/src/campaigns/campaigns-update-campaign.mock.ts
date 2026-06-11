import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_UPDATE_CAMPAIGN } from './campaigns-update-campaign.token';
import type { CampaignsUpdateCampaignResponse } from './campaigns-update-campaign.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'campaigns/update-campaign',
  path: '/orgs/{org}/campaigns/{campaign_number}',
  method: 'patch',
  tag: 'campaigns',
};

export function provideCampaignsUpdateCampaignMock(
  initialBehavior?: ProviderInitialBehavior<CampaignsUpdateCampaignResponse>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_UPDATE_CAMPAIGN,
    'CAMPAIGNS_UPDATE_CAMPAIGN',
    initialBehavior,
    _meta,
  );
}
