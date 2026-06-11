import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_SET_ADMIN_BRANCH_PROTECTION } from './repos-set-admin-branch-protection.token';
import type { ReposSetAdminBranchProtectionResponse } from './repos-set-admin-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/set-admin-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins',
  method: 'post',
  tag: 'repos',
};

export function provideReposSetAdminBranchProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposSetAdminBranchProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_SET_ADMIN_BRANCH_PROTECTION,
    'REPOS_SET_ADMIN_BRANCH_PROTECTION',
    initialBehavior,
    _meta,
  );
}
