import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersListGpgKeysForAuthenticatedUser,
  type UsersListGpgKeysForAuthenticatedUserResponse,
} from './users-list-gpg-keys-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-gpg-keys-for-authenticated-user',
  path: '/user/gpg_keys',
  method: 'get',
  tag: 'users',
};

export const USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersListGpgKeysForAuthenticatedUserResponse> =
  {
    key: 'USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersListGpgKeysForAuthenticatedUser,
  };

export function provideUsersListGpgKeysForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersListGpgKeysForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_LIST_GPG_KEYS_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
