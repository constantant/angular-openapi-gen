import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_GET_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER } from './users-get-ssh-signing-key-for-authenticated-user.token';
import type { UsersGetSshSigningKeyForAuthenticatedUserResponse } from './users-get-ssh-signing-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-ssh-signing-key-for-authenticated-user',
  path: '/user/ssh_signing_keys/{ssh_signing_key_id}',
  method: 'get',
  tag: 'users',
};

export function provideUsersGetSshSigningKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetSshSigningKeyForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_GET_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER,
    'USERS_GET_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
