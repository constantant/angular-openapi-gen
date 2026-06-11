import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_COLLABORATORS_FOR_USER } from './copilot-spaces-list-collaborators-for-user.token';
import type { CopilotSpacesListCollaboratorsForUserResponse } from './copilot-spaces-list-collaborators-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/list-collaborators-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}/collaborators',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesListCollaboratorsForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListCollaboratorsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_COLLABORATORS_FOR_USER,
    'COPILOT_SPACES_LIST_COLLABORATORS_FOR_USER',
    initialBehavior,
    _meta,
  );
}
