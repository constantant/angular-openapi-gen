import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposAddUserAccessRestrictions,
  type ReposAddUserAccessRestrictionsResponse,
} from './repos-add-user-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/add-user-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
  method: 'post',
  tag: 'repos',
};

export const REPOS_ADD_USER_ACCESS_RESTRICTIONS_MOCK: MockEndpoint<ReposAddUserAccessRestrictionsResponse> =
  {
    key: 'REPOS_ADD_USER_ACCESS_RESTRICTIONS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposAddUserAccessRestrictions,
  };

export function provideReposAddUserAccessRestrictionsMock(
  initialBehavior?: MockEndpointBehavior<ReposAddUserAccessRestrictionsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_ADD_USER_ACCESS_RESTRICTIONS_MOCK,
    initialBehavior,
  );
}
