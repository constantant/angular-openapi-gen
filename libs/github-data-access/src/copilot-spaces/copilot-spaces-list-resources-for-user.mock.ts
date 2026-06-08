import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_RESOURCES_FOR_USER } from './copilot-spaces-list-resources-for-user.token';
import type { CopilotSpacesListResourcesForUserResponse } from './copilot-spaces-list-resources-for-user.token';

export function provideCopilotSpacesListResourcesForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListResourcesForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_RESOURCES_FOR_USER,
    'COPILOT_SPACES_LIST_RESOURCES_FOR_USER',
    initialBehavior,
  );
}
