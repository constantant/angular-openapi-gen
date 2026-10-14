import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListBranches,
  type ReposListBranchesResponse,
} from './repos-list-branches.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-branches',
  path: '/repos/{owner}/{repo}/branches',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_BRANCHES_MOCK: MockEndpoint<ReposListBranchesResponse> =
  {
    key: 'REPOS_LIST_BRANCHES',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListBranches,
  };

export function provideReposListBranchesMock(
  initialBehavior?: MockEndpointBehavior<ReposListBranchesResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_LIST_BRANCHES_MOCK, initialBehavior);
}
