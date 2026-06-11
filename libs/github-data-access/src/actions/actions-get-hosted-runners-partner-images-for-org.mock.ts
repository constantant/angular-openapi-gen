import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG } from './actions-get-hosted-runners-partner-images-for-org.token';
import type { ActionsGetHostedRunnersPartnerImagesForOrgResponse } from './actions-get-hosted-runners-partner-images-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-hosted-runners-partner-images-for-org',
  path: '/orgs/{org}/actions/hosted-runners/images/partner',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetHostedRunnersPartnerImagesForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersPartnerImagesForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
