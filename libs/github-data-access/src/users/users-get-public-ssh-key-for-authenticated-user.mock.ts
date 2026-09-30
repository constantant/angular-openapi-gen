import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
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
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER,
    'USERS_GET_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
    options,
  );
}
