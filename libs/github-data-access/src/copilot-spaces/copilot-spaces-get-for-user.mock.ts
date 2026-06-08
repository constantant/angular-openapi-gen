import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_GET_FOR_USER } from './copilot-spaces-get-for-user.token';
import type { CopilotSpacesGetForUserResponse } from './copilot-spaces-get-for-user.token';

export function provideCopilotSpacesGetForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesGetForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_GET_FOR_USER,
    'COPILOT_SPACES_GET_FOR_USER',
    initialBehavior,
  );
}
