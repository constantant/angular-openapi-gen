import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateForAuthenticatedUser,
  type ReposCreateForAuthenticatedUserResponse,
} from './repos-create-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-for-authenticated-user',
  path: '/user/repos',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<ReposCreateForAuthenticatedUserResponse> =
  {
    key: 'REPOS_CREATE_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateForAuthenticatedUser,
  };

export function provideReposCreateForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateForAuthenticatedUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_CREATE_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
