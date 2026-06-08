import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_DELETE_RESOURCE_FOR_USER } from './copilot-spaces-delete-resource-for-user.token';

export function provideCopilotSpacesDeleteResourceForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_DELETE_RESOURCE_FOR_USER,
    'COPILOT_SPACES_DELETE_RESOURCE_FOR_USER',
    initialBehavior,
  );
}
