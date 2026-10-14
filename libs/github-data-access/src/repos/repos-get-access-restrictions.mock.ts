import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetAccessRestrictions,
  type ReposGetAccessRestrictionsResponse,
} from './repos-get-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_ACCESS_RESTRICTIONS_MOCK: MockEndpoint<ReposGetAccessRestrictionsResponse> =
  {
    key: 'REPOS_GET_ACCESS_RESTRICTIONS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetAccessRestrictions,
  };

export function provideReposGetAccessRestrictionsMock(
  initialBehavior?: MockEndpointBehavior<ReposGetAccessRestrictionsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_ACCESS_RESTRICTIONS_MOCK,
    initialBehavior,
  );
}
