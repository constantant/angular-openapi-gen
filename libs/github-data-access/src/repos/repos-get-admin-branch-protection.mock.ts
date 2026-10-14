import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetAdminBranchProtection,
  type ReposGetAdminBranchProtectionResponse,
} from './repos-get-admin-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-admin-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_ADMIN_BRANCH_PROTECTION_MOCK: MockEndpoint<ReposGetAdminBranchProtectionResponse> =
  {
    key: 'REPOS_GET_ADMIN_BRANCH_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetAdminBranchProtection,
  };

export function provideReposGetAdminBranchProtectionMock(
  initialBehavior?: MockEndpointBehavior<ReposGetAdminBranchProtectionResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_ADMIN_BRANCH_PROTECTION_MOCK,
    initialBehavior,
  );
}
