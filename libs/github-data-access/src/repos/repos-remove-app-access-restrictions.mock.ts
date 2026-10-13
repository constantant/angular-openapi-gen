import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposRemoveAppAccessRestrictions,
  type ReposRemoveAppAccessRestrictionsResponse,
} from './repos-remove-app-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-app-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_REMOVE_APP_ACCESS_RESTRICTIONS_MOCK: MockEndpoint<ReposRemoveAppAccessRestrictionsResponse> =
  {
    key: 'REPOS_REMOVE_APP_ACCESS_RESTRICTIONS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposRemoveAppAccessRestrictions,
  };

export function provideReposRemoveAppAccessRestrictionsMock(
  initialBehavior?: MockEndpointBehavior<ReposRemoveAppAccessRestrictionsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_REMOVE_APP_ACCESS_RESTRICTIONS_MOCK,
    initialBehavior,
  );
}
