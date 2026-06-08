import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER } from './users-list-social-accounts-for-user.token';
import type { UsersListSocialAccountsForUserResponse } from './users-list-social-accounts-for-user.token';

export function provideUsersListSocialAccountsForUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListSocialAccountsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER,
    'USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER',
    initialBehavior,
  );
}
