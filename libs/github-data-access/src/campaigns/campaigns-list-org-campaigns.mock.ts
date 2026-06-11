import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CAMPAIGNS_LIST_ORG_CAMPAIGNS } from './campaigns-list-org-campaigns.token';
import type { CampaignsListOrgCampaignsResponse } from './campaigns-list-org-campaigns.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'campaigns/list-org-campaigns',
  path: '/orgs/{org}/campaigns',
  method: 'get',
  tag: 'campaigns',
};

export function provideCampaignsListOrgCampaignsMock(
  initialBehavior?: ProviderInitialBehavior<CampaignsListOrgCampaignsResponse>,
): FactoryProvider {
  return provideMockResource(
    CAMPAIGNS_LIST_ORG_CAMPAIGNS,
    'CAMPAIGNS_LIST_ORG_CAMPAIGNS',
    initialBehavior,
    _meta,
  );
}
