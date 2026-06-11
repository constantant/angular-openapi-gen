import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_ADD_EMAIL_FOR_AUTHENTICATED_USER } from './users-add-email-for-authenticated-user.token';
import type { UsersAddEmailForAuthenticatedUserResponse } from './users-add-email-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/add-email-for-authenticated-user',
  path: '/user/emails',
  method: 'post',
  tag: 'users',
};

export function provideUsersAddEmailForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<UsersAddEmailForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_ADD_EMAIL_FOR_AUTHENTICATED_USER,
    'USERS_ADD_EMAIL_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
