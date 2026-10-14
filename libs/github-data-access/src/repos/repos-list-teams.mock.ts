import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListTeams,
  type ReposListTeamsResponse,
} from './repos-list-teams.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-teams',
  path: '/repos/{owner}/{repo}/teams',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_TEAMS_MOCK: MockEndpoint<ReposListTeamsResponse> = {
  key: 'REPOS_LIST_TEAMS',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposListTeams,
};

export function provideReposListTeamsMock(
  initialBehavior?: MockEndpointBehavior<ReposListTeamsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_LIST_TEAMS_MOCK, initialBehavior);
}
