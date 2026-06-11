import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_RESOURCES_FOR_USER } from './copilot-spaces-list-resources-for-user.token';
import type { CopilotSpacesListResourcesForUserResponse } from './copilot-spaces-list-resources-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/list-resources-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}/resources',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesListResourcesForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListResourcesForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_RESOURCES_FOR_USER,
    'COPILOT_SPACES_LIST_RESOURCES_FOR_USER',
    initialBehavior,
    _meta,
  );
}
