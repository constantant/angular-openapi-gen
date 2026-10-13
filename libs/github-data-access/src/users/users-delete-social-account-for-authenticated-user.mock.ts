import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideUsersDeleteSocialAccountForAuthenticatedUser } from './users-delete-social-account-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-social-account-for-authenticated-user',
  path: '/user/social_accounts',
  method: 'delete',
  tag: 'users',
};

export const USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<unknown> =
  {
    key: 'USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersDeleteSocialAccountForAuthenticatedUser,
  };

export function provideUsersDeleteSocialAccountForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_DELETE_SOCIAL_ACCOUNT_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
