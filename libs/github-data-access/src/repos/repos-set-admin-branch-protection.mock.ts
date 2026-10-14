import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposSetAdminBranchProtection,
  type ReposSetAdminBranchProtectionResponse,
} from './repos-set-admin-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/set-admin-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins',
  method: 'post',
  tag: 'repos',
};

export const REPOS_SET_ADMIN_BRANCH_PROTECTION_MOCK: MockEndpoint<ReposSetAdminBranchProtectionResponse> =
  {
    key: 'REPOS_SET_ADMIN_BRANCH_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposSetAdminBranchProtection,
  };

export function provideReposSetAdminBranchProtectionMock(
  initialBehavior?: MockEndpointBehavior<ReposSetAdminBranchProtectionResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_SET_ADMIN_BRANCH_PROTECTION_MOCK,
    initialBehavior,
  );
}
