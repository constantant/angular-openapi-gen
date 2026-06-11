import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_CREATE_RESOURCE_FOR_USER } from './copilot-spaces-create-resource-for-user.token';
import type { CopilotSpacesCreateResourceForUserResponse } from './copilot-spaces-create-resource-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/create-resource-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}/resources',
  method: 'post',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesCreateResourceForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesCreateResourceForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_CREATE_RESOURCE_FOR_USER,
    'COPILOT_SPACES_CREATE_RESOURCE_FOR_USER',
    initialBehavior,
    _meta,
  );
}
