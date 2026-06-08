import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_LIST_ORG_CAMPAIGNS } from './campaigns-list-org-campaigns.token';
import type { CampaignsListOrgCampaignsResponse } from './campaigns-list-org-campaigns.token';

export function provideCampaignsListOrgCampaignsMock(
  initialBehavior?: ProviderInitialBehavior<CampaignsListOrgCampaignsResponse>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_LIST_ORG_CAMPAIGNS,
    'CAMPAIGNS_LIST_ORG_CAMPAIGNS',
    initialBehavior,
  );
}
