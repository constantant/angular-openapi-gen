import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_GPG_KEYS_FOR_USER } from './users-list-gpg-keys-for-user.token';
import type { UsersListGpgKeysForUserResponse } from './users-list-gpg-keys-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-gpg-keys-for-user',
  path: '/users/{username}/gpg_keys',
  method: 'get',
  tag: 'users',
};

export function provideUsersListGpgKeysForUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListGpgKeysForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_GPG_KEYS_FOR_USER,
    'USERS_LIST_GPG_KEYS_FOR_USER',
    initialBehavior,
    _meta,
  );
}
