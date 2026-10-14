import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetAllEnvironments,
  type ReposGetAllEnvironmentsResponse,
} from './repos-get-all-environments.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-all-environments',
  path: '/repos/{owner}/{repo}/environments',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_ALL_ENVIRONMENTS_MOCK: MockEndpoint<ReposGetAllEnvironmentsResponse> =
  {
    key: 'REPOS_GET_ALL_ENVIRONMENTS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetAllEnvironments,
  };

export function provideReposGetAllEnvironmentsMock(
  initialBehavior?: MockEndpointBehavior<ReposGetAllEnvironmentsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_ALL_ENVIRONMENTS_MOCK, initialBehavior);
}
