import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER } from './users-get-public-ssh-key-for-authenticated-user.token';
import type { UsersGetPublicSshKeyForAuthenticatedUserResponse } from './users-get-public-ssh-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-public-ssh-key-for-authenticated-user',
  path: '/user/keys/{key_id}',
  method: 'get',
  tag: 'users',
};

export function provideUsersGetPublicSshKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetPublicSshKeyForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER,
    'USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
