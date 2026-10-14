import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposSetAppAccessRestrictions,
  type ReposSetAppAccessRestrictionsResponse,
} from './repos-set-app-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/set-app-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
  method: 'put',
  tag: 'repos',
};

export const REPOS_SET_APP_ACCESS_RESTRICTIONS_MOCK: MockEndpoint<ReposSetAppAccessRestrictionsResponse> =
  {
    key: 'REPOS_SET_APP_ACCESS_RESTRICTIONS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposSetAppAccessRestrictions,
  };

export function provideReposSetAppAccessRestrictionsMock(
  initialBehavior?: MockEndpointBehavior<ReposSetAppAccessRestrictionsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_SET_APP_ACCESS_RESTRICTIONS_MOCK,
    initialBehavior,
  );
}
