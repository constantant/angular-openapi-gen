import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG } from './actions-get-hosted-runners-partner-images-for-org.token';
import type { ActionsGetHostedRunnersPartnerImagesForOrgResponse } from './actions-get-hosted-runners-partner-images-for-org.token';

export function provideActionsGetHostedRunnersPartnerImagesForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersPartnerImagesForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG',
    initialBehavior,
  );
}
