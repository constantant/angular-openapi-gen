import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER } from './users-create-ssh-signing-key-for-authenticated-user.token';
import type { UsersCreateSshSigningKeyForAuthenticatedUserResponse } from './users-create-ssh-signing-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/create-ssh-signing-key-for-authenticated-user',
  path: '/user/ssh_signing_keys',
  method: 'post',
  tag: 'users',
};

export function provideUsersCreateSshSigningKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersCreateSshSigningKeyForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER,
    'USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
