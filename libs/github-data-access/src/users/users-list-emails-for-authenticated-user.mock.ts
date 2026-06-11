import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER } from './users-list-emails-for-authenticated-user.token';
import type { UsersListEmailsForAuthenticatedUserResponse } from './users-list-emails-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-emails-for-authenticated-user',
  path: '/user/emails',
  method: 'get',
  tag: 'users',
};

export function provideUsersListEmailsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersListEmailsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER,
    'USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
