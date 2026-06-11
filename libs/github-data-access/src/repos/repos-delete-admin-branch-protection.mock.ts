import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_ADMIN_BRANCH_PROTECTION } from './repos-delete-admin-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-admin-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteAdminBranchProtectionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_ADMIN_BRANCH_PROTECTION,
    'REPOS_DELETE_ADMIN_BRANCH_PROTECTION',
    initialBehavior,
    _meta,
  );
}
