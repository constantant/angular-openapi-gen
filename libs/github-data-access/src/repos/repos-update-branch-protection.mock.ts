import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateBranchProtection,
  type ReposUpdateBranchProtectionResponse,
} from './repos-update-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection',
  method: 'put',
  tag: 'repos',
};

export const REPOS_UPDATE_BRANCH_PROTECTION_MOCK: MockEndpoint<ReposUpdateBranchProtectionResponse> =
  {
    key: 'REPOS_UPDATE_BRANCH_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateBranchProtection,
  };

export function provideReposUpdateBranchProtectionMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateBranchProtectionResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_UPDATE_BRANCH_PROTECTION_MOCK,
    initialBehavior,
  );
}
