import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER } from './users-delete-gpg-key-for-authenticated-user.token';

export function provideUsersDeleteGpgKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER,
    'USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
