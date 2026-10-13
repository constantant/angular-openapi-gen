import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposRemoveUserAccessRestrictions,
  type ReposRemoveUserAccessRestrictionsResponse,
} from './repos-remove-user-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-user-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_REMOVE_USER_ACCESS_RESTRICTIONS_MOCK: MockEndpoint<ReposRemoveUserAccessRestrictionsResponse> =
  {
    key: 'REPOS_REMOVE_USER_ACCESS_RESTRICTIONS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposRemoveUserAccessRestrictions,
  };

export function provideReposRemoveUserAccessRestrictionsMock(
  initialBehavior?: MockEndpointBehavior<ReposRemoveUserAccessRestrictionsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_REMOVE_USER_ACCESS_RESTRICTIONS_MOCK,
    initialBehavior,
  );
}
