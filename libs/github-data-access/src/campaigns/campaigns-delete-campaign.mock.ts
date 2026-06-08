import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_DELETE_CAMPAIGN } from './campaigns-delete-campaign.token';

export function provideCampaignsDeleteCampaignMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_DELETE_CAMPAIGN,
    'CAMPAIGNS_DELETE_CAMPAIGN',
    initialBehavior,
  );
}
