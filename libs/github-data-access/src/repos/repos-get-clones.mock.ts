import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetClones,
  type ReposGetClonesResponse,
} from './repos-get-clones.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-clones',
  path: '/repos/{owner}/{repo}/traffic/clones',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_CLONES_MOCK: MockEndpoint<ReposGetClonesResponse> = {
  key: 'REPOS_GET_CLONES',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposGetClones,
};

export function provideReposGetClonesMock(
  initialBehavior?: MockEndpointBehavior<ReposGetClonesResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_CLONES_MOCK, initialBehavior);
}
