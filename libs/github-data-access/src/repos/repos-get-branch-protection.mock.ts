import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_BRANCH_PROTECTION } from './repos-get-branch-protection.token';
import type { ReposGetBranchProtectionResponse } from './repos-get-branch-protection.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-branch-protection',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetBranchProtectionMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetBranchProtectionResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_BRANCH_PROTECTION,
    'REPOS_GET_BRANCH_PROTECTION',
    initialBehavior,
    _meta,
  );
}
