import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_CREATE_FOR_USER } from './copilot-spaces-create-for-user.token';
import type { CopilotSpacesCreateForUserResponse } from './copilot-spaces-create-for-user.token';

export function provideCopilotSpacesCreateForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesCreateForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_CREATE_FOR_USER,
    'COPILOT_SPACES_CREATE_FOR_USER',
    initialBehavior,
  );
}
