import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetCommit,
  type ReposGetCommitResponse,
} from './repos-get-commit.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-commit',
  path: '/repos/{owner}/{repo}/commits/{ref}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_COMMIT_MOCK: MockEndpoint<ReposGetCommitResponse> = {
  key: 'REPOS_GET_COMMIT',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposGetCommit,
};

export function provideReposGetCommitMock(
  initialBehavior?: MockEndpointBehavior<ReposGetCommitResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_COMMIT_MOCK, initialBehavior);
}
