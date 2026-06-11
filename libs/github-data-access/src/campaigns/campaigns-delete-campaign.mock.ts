import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_DELETE_CAMPAIGN } from './campaigns-delete-campaign.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'campaigns/delete-campaign',
  path: '/orgs/{org}/campaigns/{campaign_number}',
  method: 'delete',
  tag: 'campaigns',
};

export function provideCampaignsDeleteCampaignMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_DELETE_CAMPAIGN,
    'CAMPAIGNS_DELETE_CAMPAIGN',
    initialBehavior,
    _meta,
  );
}
