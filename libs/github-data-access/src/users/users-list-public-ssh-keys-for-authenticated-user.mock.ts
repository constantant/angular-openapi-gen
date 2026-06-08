import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER } from './users-list-public-ssh-keys-for-authenticated-user.token';
import type { UsersListPublicSshKeysForAuthenticatedUserResponse } from './users-list-public-ssh-keys-for-authenticated-user.token';

export function provideUsersListPublicSshKeysForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListPublicSshKeysForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER,
    'USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
