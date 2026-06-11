import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER } from './copilot-spaces-add-collaborator-for-user.token';
import type { CopilotSpacesAddCollaboratorForUserResponse } from './copilot-spaces-add-collaborator-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/add-collaborator-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}/collaborators',
  method: 'post',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesAddCollaboratorForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesAddCollaboratorForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER,
    'COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER',
    initialBehavior,
    _meta,
  );
}
