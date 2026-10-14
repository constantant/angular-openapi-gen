import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetAppsWithAccessToProtectedBranch,
  type ReposGetAppsWithAccessToProtectedBranchResponse,
} from './repos-get-apps-with-access-to-protected-branch.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-apps-with-access-to-protected-branch',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_APPS_WITH_ACCESS_TO_PROTECTED_BRANCH_MOCK: MockEndpoint<ReposGetAppsWithAccessToProtectedBranchResponse> =
  {
    key: 'REPOS_GET_APPS_WITH_ACCESS_TO_PROTECTED_BRANCH',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetAppsWithAccessToProtectedBranch,
  };

export function provideReposGetAppsWithAccessToProtectedBranchMock(
  initialBehavior?: MockEndpointBehavior<ReposGetAppsWithAccessToProtectedBranchResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_APPS_WITH_ACCESS_TO_PROTECTED_BRANCH_MOCK,
    initialBehavior,
  );
}
