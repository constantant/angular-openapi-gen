import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_BRANCH_PROTECTION } from './repos-update-branch-protection.token';
import type { ReposUpdateBranchProtectionResponse } from './repos-update-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection',
  method: 'put',
  tag: 'repos',
};

export function provideReposUpdateBranchProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateBranchProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_BRANCH_PROTECTION,
    'REPOS_UPDATE_BRANCH_PROTECTION',
    initialBehavior,
    _meta,
  );
}
