import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_CUSTOM_IMAGE_FROM_ORG } from './actions-delete-custom-image-from-org.token';

export function provideActionsDeleteCustomImageFromOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_CUSTOM_IMAGE_FROM_ORG,
    'ACTIONS_DELETE_CUSTOM_IMAGE_FROM_ORG',
    initialBehavior,
  );
}
