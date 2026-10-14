import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListForUser,
  type ReposListForUserResponse,
} from './repos-list-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-for-user',
  path: '/users/{username}/repos',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_FOR_USER_MOCK: MockEndpoint<ReposListForUserResponse> =
  {
    key: 'REPOS_LIST_FOR_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListForUser,
  };

export function provideReposListForUserMock(
  initialBehavior?: MockEndpointBehavior<ReposListForUserResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_LIST_FOR_USER_MOCK, initialBehavior);
}
