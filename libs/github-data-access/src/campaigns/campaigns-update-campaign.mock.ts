import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_UPDATE_CAMPAIGN } from './campaigns-update-campaign.token';
import type { CampaignsUpdateCampaignResponse } from './campaigns-update-campaign.token';

export function provideCampaignsUpdateCampaignMock(
  initialBehavior?: ProviderInitialBehavior<CampaignsUpdateCampaignResponse>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_UPDATE_CAMPAIGN,
    'CAMPAIGNS_UPDATE_CAMPAIGN',
    initialBehavior,
  );
}
