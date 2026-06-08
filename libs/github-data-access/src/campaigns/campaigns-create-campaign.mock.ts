import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_CREATE_CAMPAIGN } from './campaigns-create-campaign.token';
import type { CampaignsCreateCampaignResponse } from './campaigns-create-campaign.token';

export function provideCampaignsCreateCampaignMock(
  initialBehavior?: ProviderInitialBehavior<CampaignsCreateCampaignResponse>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_CREATE_CAMPAIGN,
    'CAMPAIGNS_CREATE_CAMPAIGN',
    initialBehavior,
  );
}
