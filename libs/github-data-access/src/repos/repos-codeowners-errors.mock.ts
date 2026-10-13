import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCodeownersErrors,
  type ReposCodeownersErrorsResponse,
} from './repos-codeowners-errors.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/codeowners-errors',
  path: '/repos/{owner}/{repo}/codeowners/errors',
  method: 'get',
  tag: 'repos',
};

export const REPOS_CODEOWNERS_ERRORS_MOCK: MockEndpoint<ReposCodeownersErrorsResponse> =
  {
    key: 'REPOS_CODEOWNERS_ERRORS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCodeownersErrors,
  };

export function provideReposCodeownersErrorsMock(
  initialBehavior?: MockEndpointBehavior<ReposCodeownersErrorsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_CODEOWNERS_ERRORS_MOCK, initialBehavior);
}
