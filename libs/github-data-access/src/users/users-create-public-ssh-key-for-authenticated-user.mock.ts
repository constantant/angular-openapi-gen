import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER } from './users-create-public-ssh-key-for-authenticated-user.token';
import type { UsersCreatePublicSshKeyForAuthenticatedUserResponse } from './users-create-public-ssh-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/create-public-ssh-key-for-authenticated-user',
  path: '/user/keys',
  method: 'post',
  tag: 'users',
};

export function provideUsersCreatePublicSshKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersCreatePublicSshKeyForAuthenticatedUserResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER,
    'USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
    options,
  );
}
