import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposSetTeamAccessRestrictions,
  type ReposSetTeamAccessRestrictionsResponse,
} from './repos-set-team-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/set-team-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams',
  method: 'put',
  tag: 'repos',
};

export const REPOS_SET_TEAM_ACCESS_RESTRICTIONS_MOCK: MockEndpoint<ReposSetTeamAccessRestrictionsResponse> =
  {
    key: 'REPOS_SET_TEAM_ACCESS_RESTRICTIONS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposSetTeamAccessRestrictions,
  };

export function provideReposSetTeamAccessRestrictionsMock(
  initialBehavior?: MockEndpointBehavior<ReposSetTeamAccessRestrictionsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_SET_TEAM_ACCESS_RESTRICTIONS_MOCK,
    initialBehavior,
  );
}
