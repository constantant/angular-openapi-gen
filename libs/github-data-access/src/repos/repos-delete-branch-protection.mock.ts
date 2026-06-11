import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_BRANCH_PROTECTION } from './repos-delete-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteBranchProtectionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_BRANCH_PROTECTION,
    'REPOS_DELETE_BRANCH_PROTECTION',
    initialBehavior,
    _meta,
  );
}
