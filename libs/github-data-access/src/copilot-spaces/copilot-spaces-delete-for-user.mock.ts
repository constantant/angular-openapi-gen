import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_DELETE_FOR_USER } from './copilot-spaces-delete-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/delete-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}',
  method: 'delete',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesDeleteForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_DELETE_FOR_USER,
    'COPILOT_SPACES_DELETE_FOR_USER',
    initialBehavior,
    _meta,
  );
}
