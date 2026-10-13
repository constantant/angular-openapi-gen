import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersSetPrimaryEmailVisibilityForAuthenticatedUser,
  type UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse,
} from './users-set-primary-email-visibility-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/set-primary-email-visibility-for-authenticated-user',
  path: '/user/email/visibility',
  method: 'patch',
  tag: 'users',
};

export const USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse> =
  {
    key: 'USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersSetPrimaryEmailVisibilityForAuthenticatedUser,
  };

export function provideUsersSetPrimaryEmailVisibilityForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersSetPrimaryEmailVisibilityForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_SET_PRIMARY_EMAIL_VISIBILITY_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
