import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER } from './users-add-social-account-for-authenticated-user.token';
import type { UsersAddSocialAccountForAuthenticatedUserResponse } from './users-add-social-account-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/add-social-account-for-authenticated-user',
  path: '/user/social_accounts',
  method: 'post',
  tag: 'users',
};

export function provideUsersAddSocialAccountForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersAddSocialAccountForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER,
    'USERS_ADD_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
