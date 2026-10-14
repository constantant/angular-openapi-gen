import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideUsersCreateSshSigningKeyForAuthenticatedUser,
  type UsersCreateSshSigningKeyForAuthenticatedUserResponse,
} from './users-create-ssh-signing-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/create-ssh-signing-key-for-authenticated-user',
  path: '/user/ssh_signing_keys',
  method: 'post',
  tag: 'users',
};

export const USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<UsersCreateSshSigningKeyForAuthenticatedUserResponse> =
  {
    key: 'USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersCreateSshSigningKeyForAuthenticatedUser,
  };

export function provideUsersCreateSshSigningKeyForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<UsersCreateSshSigningKeyForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_CREATE_SSH_SIGNING_KEY_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
