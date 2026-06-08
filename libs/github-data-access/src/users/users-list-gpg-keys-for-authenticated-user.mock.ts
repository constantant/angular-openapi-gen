import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER } from './users-list-gpg-keys-for-authenticated-user.token';
import type { UsersListGpgKeysForAuthenticatedUserResponse } from './users-list-gpg-keys-for-authenticated-user.token';

export function provideUsersListGpgKeysForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListGpgKeysForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER,
    'USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
