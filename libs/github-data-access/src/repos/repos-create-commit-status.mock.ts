import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposCreateCommitStatus,
  type ReposCreateCommitStatusResponse,
} from './repos-create-commit-status.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-commit-status',
  path: '/repos/{owner}/{repo}/statuses/{sha}',
  method: 'post',
  tag: 'repos',
};

export const REPOS_CREATE_COMMIT_STATUS_MOCK: MockEndpoint<ReposCreateCommitStatusResponse> =
  {
    key: 'REPOS_CREATE_COMMIT_STATUS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposCreateCommitStatus,
  };

export function provideReposCreateCommitStatusMock(
  initialBehavior?: MockEndpointBehavior<ReposCreateCommitStatusResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_CREATE_COMMIT_STATUS_MOCK, initialBehavior);
}
