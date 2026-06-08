import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_GET_RESOURCE_FOR_USER } from './copilot-spaces-get-resource-for-user.token';
import type { CopilotSpacesGetResourceForUserResponse } from './copilot-spaces-get-resource-for-user.token';

export function provideCopilotSpacesGetResourceForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesGetResourceForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_GET_RESOURCE_FOR_USER,
    'COPILOT_SPACES_GET_RESOURCE_FOR_USER',
    initialBehavior,
  );
}
