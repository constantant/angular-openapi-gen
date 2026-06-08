import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER } from './copilot-spaces-add-collaborator-for-user.token';
import type { CopilotSpacesAddCollaboratorForUserResponse } from './copilot-spaces-add-collaborator-for-user.token';

export function provideCopilotSpacesAddCollaboratorForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesAddCollaboratorForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER,
    'COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER',
    initialBehavior,
  );
}
