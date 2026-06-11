import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER } from './copilot-spaces-update-resource-for-user.token';
import type { CopilotSpacesUpdateResourceForUserResponse } from './copilot-spaces-update-resource-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/update-resource-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  method: 'put',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesUpdateResourceForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateResourceForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER,
    'COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER',
    initialBehavior,
    _meta,
  );
}
