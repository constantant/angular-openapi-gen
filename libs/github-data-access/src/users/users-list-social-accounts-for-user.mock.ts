import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER } from './users-list-social-accounts-for-user.token';
import type { UsersListSocialAccountsForUserResponse } from './users-list-social-accounts-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-social-accounts-for-user',
  path: '/users/{username}/social_accounts',
  method: 'get',
  tag: 'users',
};

export function provideUsersListSocialAccountsForUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListSocialAccountsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER,
    'USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER',
    initialBehavior,
    _meta,
  );
}
