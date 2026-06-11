import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_GET_GPG_KEY_FOR_AUTHENTICATED_USER } from './users-get-gpg-key-for-authenticated-user.token';
import type { UsersGetGpgKeyForAuthenticatedUserResponse } from './users-get-gpg-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-gpg-key-for-authenticated-user',
  path: '/user/gpg_keys/{gpg_key_id}',
  method: 'get',
  tag: 'users',
};

export function provideUsersGetGpgKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetGpgKeyForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_GET_GPG_KEY_FOR_AUTHENTICATED_USER,
    'USERS_GET_GPG_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
