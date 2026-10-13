import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetBranch,
  type ReposGetBranchResponse,
} from './repos-get-branch.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-branch',
  path: '/repos/{owner}/{repo}/branches/{branch}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_BRANCH_MOCK: MockEndpoint<ReposGetBranchResponse> = {
  key: 'REPOS_GET_BRANCH',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposGetBranch,
};

export function provideReposGetBranchMock(
  initialBehavior?: MockEndpointBehavior<ReposGetBranchResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_BRANCH_MOCK, initialBehavior);
}
