import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_FOR_USER } from './copilot-spaces-update-for-user.token';
import type { CopilotSpacesUpdateForUserResponse } from './copilot-spaces-update-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/update-for-user',
  path: '/users/{username}/copilot-spaces/{space_number}',
  method: 'put',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesUpdateForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_FOR_USER,
    'COPILOT_SPACES_UPDATE_FOR_USER',
    initialBehavior,
    _meta,
  );
}
