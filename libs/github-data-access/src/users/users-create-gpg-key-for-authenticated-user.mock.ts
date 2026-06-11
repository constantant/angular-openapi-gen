import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_CREATE_GPG_KEY_FOR_AUTHENTICATED_USER } from './users-create-gpg-key-for-authenticated-user.token';
import type { UsersCreateGpgKeyForAuthenticatedUserResponse } from './users-create-gpg-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/create-gpg-key-for-authenticated-user',
  path: '/user/gpg_keys',
  method: 'post',
  tag: 'users',
};

export function provideUsersCreateGpgKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersCreateGpgKeyForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_CREATE_GPG_KEY_FOR_AUTHENTICATED_USER,
    'USERS_CREATE_GPG_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
