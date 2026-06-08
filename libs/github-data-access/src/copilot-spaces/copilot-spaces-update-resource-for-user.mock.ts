import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER } from './copilot-spaces-update-resource-for-user.token';
import type { CopilotSpacesUpdateResourceForUserResponse } from './copilot-spaces-update-resource-for-user.token';

export function provideCopilotSpacesUpdateResourceForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateResourceForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER,
    'COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER',
    initialBehavior,
  );
}
