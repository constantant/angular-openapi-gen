import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER } from './copilot-spaces-update-collaborator-for-user.token';
import type { CopilotSpacesUpdateCollaboratorForUserResponse } from './copilot-spaces-update-collaborator-for-user.token';

export function provideCopilotSpacesUpdateCollaboratorForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateCollaboratorForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER,
    'COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER',
    initialBehavior,
  );
}
