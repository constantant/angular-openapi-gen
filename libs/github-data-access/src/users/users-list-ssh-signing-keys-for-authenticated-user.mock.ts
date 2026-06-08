import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER } from './users-list-ssh-signing-keys-for-authenticated-user.token';
import type { UsersListSshSigningKeysForAuthenticatedUserResponse } from './users-list-ssh-signing-keys-for-authenticated-user.token';

export function provideUsersListSshSigningKeysForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListSshSigningKeysForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER,
    'USERS_LIST_SSH_SIGNING_KEYS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
