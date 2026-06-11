import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER } from './copilot-spaces-update-collaborator-for-user.token';
import type { CopilotSpacesUpdateCollaboratorForUserResponse } from './copilot-spaces-update-collaborator-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/update-collaborator-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}',
  method: 'put',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesUpdateCollaboratorForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateCollaboratorForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER,
    'COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER',
    initialBehavior,
    _meta,
  );
}
