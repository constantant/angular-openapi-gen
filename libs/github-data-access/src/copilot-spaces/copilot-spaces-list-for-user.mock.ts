import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_FOR_USER } from './copilot-spaces-list-for-user.token';
import type { CopilotSpacesListForUserResponse } from './copilot-spaces-list-for-user.token';

export function provideCopilotSpacesListForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_FOR_USER,
    'COPILOT_SPACES_LIST_FOR_USER',
    initialBehavior,
  );
}
