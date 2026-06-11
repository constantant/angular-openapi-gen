import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER } from './users-delete-email-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-email-for-authenticated-user',
  path: '/user/emails',
  method: 'delete',
  tag: 'users',
};

export function provideUsersDeleteEmailForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER,
    'USERS_DELETE_EMAIL_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
