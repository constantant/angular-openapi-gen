import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER } from './users-list-public-emails-for-authenticated-user.token';
import type { UsersListPublicEmailsForAuthenticatedUserResponse } from './users-list-public-emails-for-authenticated-user.token';

export function provideUsersListPublicEmailsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListPublicEmailsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER,
    'USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
