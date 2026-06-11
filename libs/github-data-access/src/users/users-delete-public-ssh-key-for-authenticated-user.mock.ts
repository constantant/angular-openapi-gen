import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER } from './users-delete-public-ssh-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-public-ssh-key-for-authenticated-user',
  path: '/user/keys/{key_id}',
  method: 'delete',
  tag: 'users',
};

export function provideUsersDeletePublicSshKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER,
    'USERS_DELETE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
