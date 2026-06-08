import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_CUSTOM_IMAGE_FOR_ORG } from './actions-get-custom-image-for-org.token';
import type { ActionsGetCustomImageForOrgResponse } from './actions-get-custom-image-for-org.token';

export function provideActionsGetCustomImageForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetCustomImageForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_CUSTOM_IMAGE_FOR_ORG,
    'ACTIONS_GET_CUSTOM_IMAGE_FOR_ORG',
    initialBehavior,
  );
}
