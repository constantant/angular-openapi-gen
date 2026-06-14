import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH } from './repos-get-users-with-access-to-protected-branch.token';
import type { ReposGetUsersWithAccessToProtectedBranchResponse } from './repos-get-users-with-access-to-protected-branch.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-users-with-access-to-protected-branch',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetUsersWithAccessToProtectedBranchMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetUsersWithAccessToProtectedBranchResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH,
    'REPOS_GET_USERS_WITH_ACCESS_TO_PROTECTED_BRANCH',
    initialBehavior,
    _meta,
    options,
  );
}
