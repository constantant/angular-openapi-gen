import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_CUSTOM_IMAGE_VERSIONS_FOR_ORG } from './actions-list-custom-image-versions-for-org.token';
import type { ActionsListCustomImageVersionsForOrgResponse } from './actions-list-custom-image-versions-for-org.token';

export function provideActionsListCustomImageVersionsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListCustomImageVersionsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_CUSTOM_IMAGE_VERSIONS_FOR_ORG,
    'ACTIONS_LIST_CUSTOM_IMAGE_VERSIONS_FOR_ORG',
    initialBehavior,
  );
}
