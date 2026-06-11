import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_ADD_COPILOT_SEATS_FOR_USERS } from './copilot-add-copilot-seats-for-users.token';
import type { CopilotAddCopilotSeatsForUsersResponse } from './copilot-add-copilot-seats-for-users.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/add-copilot-seats-for-users',
  path: '/orgs/{org}/copilot/billing/selected_users',
  method: 'post',
  tag: 'copilot',
};

export function provideCopilotAddCopilotSeatsForUsersMock(
  initialBehavior?: ProviderInitialBehavior<CopilotAddCopilotSeatsForUsersResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_ADD_COPILOT_SEATS_FOR_USERS,
    'COPILOT_ADD_COPILOT_SEATS_FOR_USERS',
    initialBehavior,
    _meta,
  );
}
