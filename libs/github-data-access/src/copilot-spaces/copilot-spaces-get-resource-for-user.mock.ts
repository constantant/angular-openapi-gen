import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_GET_RESOURCE_FOR_USER } from './copilot-spaces-get-resource-for-user.token';
import type { CopilotSpacesGetResourceForUserResponse } from './copilot-spaces-get-resource-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/get-resource-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesGetResourceForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesGetResourceForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_GET_RESOURCE_FOR_USER,
    'COPILOT_SPACES_GET_RESOURCE_FOR_USER',
    initialBehavior,
    _meta,
  );
}
