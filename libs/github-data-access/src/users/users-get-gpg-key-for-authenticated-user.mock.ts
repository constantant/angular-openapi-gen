import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersGetGpgKeyForAuthenticatedUser,
  type UsersGetGpgKeyForAuthenticatedUserResponse,
} from './users-get-gpg-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/get-gpg-key-for-authenticated-user',
  path: '/user/gpg_keys/{gpg_key_id}',
  method: 'get',
  tag: 'users',
};

export const USERS_GET_GPG_KEY_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersGetGpgKeyForAuthenticatedUserResponse> =
  {
    key: 'USERS_GET_GPG_KEY_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersGetGpgKeyForAuthenticatedUser,
  };

export function provideUsersGetGpgKeyForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersGetGpgKeyForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_GET_GPG_KEY_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
