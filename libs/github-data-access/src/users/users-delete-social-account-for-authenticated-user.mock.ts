import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER } from './users-delete-social-account-for-authenticated-user.token';

export function provideUsersDeleteSocialAccountForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER,
    'USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
