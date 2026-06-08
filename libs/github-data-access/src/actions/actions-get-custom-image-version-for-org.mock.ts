import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG } from './actions-get-custom-image-version-for-org.token';
import type { ActionsGetCustomImageVersionForOrgResponse } from './actions-get-custom-image-version-for-org.token';

export function provideActionsGetCustomImageVersionForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetCustomImageVersionForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG,
    'ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG',
    initialBehavior,
  );
}
