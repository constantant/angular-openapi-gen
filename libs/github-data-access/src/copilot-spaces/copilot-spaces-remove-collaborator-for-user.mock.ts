import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_REMOVE_COLLABORATOR_FOR_USER } from './copilot-spaces-remove-collaborator-for-user.token';

export function provideCopilotSpacesRemoveCollaboratorForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_REMOVE_COLLABORATOR_FOR_USER,
    'COPILOT_SPACES_REMOVE_COLLABORATOR_FOR_USER',
    initialBehavior,
  );
}
