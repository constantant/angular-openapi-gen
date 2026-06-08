import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER } from './users-set-primary-email-visibility-for-authenticated-user.token';
import type { UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse } from './users-set-primary-email-visibility-for-authenticated-user.token';

export function provideUsersSetPrimaryEmailVisibilityForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER,
    'USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
