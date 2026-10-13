import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideUsersCheckPersonIsFollowedByAuthenticated } from './users-check-person-is-followed-by-authenticated.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/check-person-is-followed-by-authenticated',
  path: '/user/following/{username}',
  method: 'get',
  tag: 'users',
};

export const USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED_MOCK: MockEndpoint<unknown> =
  {
    key: 'USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideUsersCheckPersonIsFollowedByAuthenticated,
  };

export function provideUsersCheckPersonIsFollowedByAuthenticatedMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED_MOCK,
    initialBehavior,
  );
}
