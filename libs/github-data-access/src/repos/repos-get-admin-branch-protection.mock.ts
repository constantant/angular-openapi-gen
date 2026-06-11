import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ADMIN_BRANCH_PROTECTION } from './repos-get-admin-branch-protection.token';
import type { ReposGetAdminBranchProtectionResponse } from './repos-get-admin-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-admin-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetAdminBranchProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAdminBranchProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ADMIN_BRANCH_PROTECTION,
    'REPOS_GET_ADMIN_BRANCH_PROTECTION',
    initialBehavior,
    _meta,
  );
}
