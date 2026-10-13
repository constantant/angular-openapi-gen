import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersCreateGpgKeyForAuthenticatedUser,
  type UsersCreateGpgKeyForAuthenticatedUserResponse,
} from './users-create-gpg-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/create-gpg-key-for-authenticated-user',
  path: '/user/gpg_keys',
  method: 'post',
  tag: 'users',
};

export const USERS_CREATE_GPG_KEY_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersCreateGpgKeyForAuthenticatedUserResponse> =
  {
    key: 'USERS_CREATE_GPG_KEY_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersCreateGpgKeyForAuthenticatedUser,
  };

export function provideUsersCreateGpgKeyForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersCreateGpgKeyForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_CREATE_GPG_KEY_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
