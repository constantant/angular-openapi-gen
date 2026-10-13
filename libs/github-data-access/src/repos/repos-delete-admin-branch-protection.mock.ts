import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeleteAdminBranchProtection } from './repos-delete-admin-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-admin-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_ADMIN_BRANCH_PROTECTION_MOCK: MockEndpoint<unknown> =
  {
    key: 'REPOS_DELETE_ADMIN_BRANCH_PROTECTION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposDeleteAdminBranchProtection,
  };

export function provideReposDeleteAdminBranchProtectionMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_DELETE_ADMIN_BRANCH_PROTECTION_MOCK,
    initialBehavior,
  );
}
