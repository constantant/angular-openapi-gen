import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_SSH_SIGNING_KEYS_FOR_USER } from './users-list-ssh-signing-keys-for-user.token';
import type { UsersListSshSigningKeysForUserResponse } from './users-list-ssh-signing-keys-for-user.token';

export function provideUsersListSshSigningKeysForUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListSshSigningKeysForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_SSH_SIGNING_KEYS_FOR_USER,
    'USERS_LIST_SSH_SIGNING_KEYS_FOR_USER',
    initialBehavior,
  );
}
