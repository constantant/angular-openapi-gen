import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_UPDATE_AUTHENTICATED } from './users-update-authenticated.token';
import type { UsersUpdateAuthenticatedResponse } from './users-update-authenticated.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/update-authenticated',
  path: '/user',
  method: 'patch',
  tag: 'users',
};

export function provideUsersUpdateAuthenticatedMock(
  initialBehavior?: ProviderInitialBehavior<UsersUpdateAuthenticatedResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_UPDATE_AUTHENTICATED,
    'USERS_UPDATE_AUTHENTICATED',
    initialBehavior,
    _meta,
  );
}
