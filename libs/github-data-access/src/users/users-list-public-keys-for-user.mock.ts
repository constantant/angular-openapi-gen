import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_PUBLIC_KEYS_FOR_USER } from './users-list-public-keys-for-user.token';
import type { UsersListPublicKeysForUserResponse } from './users-list-public-keys-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-public-keys-for-user',
  path: '/users/{username}/keys',
  method: 'get',
  tag: 'users',
};

export function provideUsersListPublicKeysForUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListPublicKeysForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_PUBLIC_KEYS_FOR_USER,
    'USERS_LIST_PUBLIC_KEYS_FOR_USER',
    initialBehavior,
    _meta,
  );
}
