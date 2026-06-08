import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER } from './users-list-emails-for-authenticated-user.token';
import type { UsersListEmailsForAuthenticatedUserResponse } from './users-list-emails-for-authenticated-user.token';

export function provideUsersListEmailsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListEmailsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER,
    'USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
