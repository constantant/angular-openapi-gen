import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_CREATE_CAMPAIGN } from './campaigns-create-campaign.token';
import type { CampaignsCreateCampaignResponse } from './campaigns-create-campaign.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'campaigns/create-campaign',
  path: '/orgs/{org}/campaigns',
  method: 'post',
  tag: 'campaigns',
};

export function provideCampaignsCreateCampaignMock(
  initialBehavior?: ProviderInitialBehavior<CampaignsCreateCampaignResponse>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_CREATE_CAMPAIGN,
    'CAMPAIGNS_CREATE_CAMPAIGN',
    initialBehavior,
    _meta,
  );
}
