import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetUsersWithAccessToProtectedBranch,
  type ReposGetUsersWithAccessToProtectedBranchResponse,
} from './repos-get-users-with-access-to-protected-branch.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-users-with-access-to-protected-branch',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH_MOCK: MockEndpoint<ReposGetUsersWithAccessToProtectedBranchResponse> =
  {
    key: 'REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetUsersWithAccessToProtectedBranch,
  };

export function provideReposGetUsersWithAccessToProtectedBranchMock(
  initialBehavior?: MockEndpointBehavior<ReposGetUsersWithAccessToProtectedBranchResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH_MOCK,
    initialBehavior,
  );
}
