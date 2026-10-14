import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposSetUserAccessRestrictions,
  type ReposSetUserAccessRestrictionsResponse,
} from './repos-set-user-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/set-user-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
  method: 'put',
  tag: 'repos',
};

export const REPOS_SET_USER_ACCESS_RESTRICTIONS_MOCK: MockEndpoint<ReposSetUserAccessRestrictionsResponse> =
  {
    key: 'REPOS_SET_USER_ACCESS_RESTRICTIONS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposSetUserAccessRestrictions,
  };

export function provideReposSetUserAccessRestrictionsMock(
  initialBehavior?: MockEndpointBehavior<ReposSetUserAccessRestrictionsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_SET_USER_ACCESS_RESTRICTIONS_MOCK,
    initialBehavior,
  );
}
