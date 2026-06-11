import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_DELETE_RESOURCE_FOR_USER } from './copilot-spaces-delete-resource-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/delete-resource-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  method: 'delete',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesDeleteResourceForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_DELETE_RESOURCE_FOR_USER,
    'COPILOT_SPACES_DELETE_RESOURCE_FOR_USER',
    initialBehavior,
    _meta,
  );
}
