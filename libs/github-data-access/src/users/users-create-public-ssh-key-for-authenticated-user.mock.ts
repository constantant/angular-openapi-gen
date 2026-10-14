import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersCreatePublicSshKeyForAuthenticatedUser,
  type UsersCreatePublicSshKeyForAuthenticatedUserResponse,
} from './users-create-public-ssh-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/create-public-ssh-key-for-authenticated-user',
  path: '/user/keys',
  method: 'post',
  tag: 'users',
};

export const USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersCreatePublicSshKeyForAuthenticatedUserResponse> =
  {
    key: 'USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersCreatePublicSshKeyForAuthenticatedUser,
  };

export function provideUsersCreatePublicSshKeyForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersCreatePublicSshKeyForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_CREATE_PUBLIC_SSH_KEY_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
