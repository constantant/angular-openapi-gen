import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_GET_CONTEXT_FOR_USER } from './users-get-context-for-user.token';
import type { UsersGetContextForUserResponse } from './users-get-context-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-context-for-user',
  path: '/users/{username}/hovercard',
  method: 'get',
  tag: 'users',
};

export function provideUsersGetContextForUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetContextForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_GET_CONTEXT_FOR_USER,
    'USERS_GET_CONTEXT_FOR_USER',
    initialBehavior,
    _meta,
  );
}
