import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_SOCIAL_ACCOUNTS_FOR_AUTHENTICATED_USER } from './users-list-social-accounts-for-authenticated-user.token';
import type { UsersListSocialAccountsForAuthenticatedUserResponse } from './users-list-social-accounts-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-social-accounts-for-authenticated-user',
  path: '/user/social_accounts',
  method: 'get',
  tag: 'users',
};

export function provideUsersListSocialAccountsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListSocialAccountsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_SOCIAL_ACCOUNTS_FOR_AUTHENTICATED_USER,
    'USERS_LIST_SOCIAL_ACCOUNTS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
