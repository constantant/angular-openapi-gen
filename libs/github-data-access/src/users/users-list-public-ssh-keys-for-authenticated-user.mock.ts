import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersListPublicSshKeysForAuthenticatedUser,
  type UsersListPublicSshKeysForAuthenticatedUserResponse,
} from './users-list-public-ssh-keys-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/list-public-ssh-keys-for-authenticated-user',
  path: '/user/keys',
  method: 'get',
  tag: 'users',
};

export const USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersListPublicSshKeysForAuthenticatedUserResponse> =
  {
    key: 'USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersListPublicSshKeysForAuthenticatedUser,
  };

export function provideUsersListPublicSshKeysForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersListPublicSshKeysForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
