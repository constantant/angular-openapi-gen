import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_FOR_USER } from './copilot-spaces-list-for-user.token';
import type { CopilotSpacesListForUserResponse } from './copilot-spaces-list-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/list-for-user',
  path: '/users/{username}/copilot-spaces',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesListForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_FOR_USER,
    'COPILOT_SPACES_LIST_FOR_USER',
    initialBehavior,
    _meta,
  );
}
