import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_USER_ACCESS_RESTRICTIONS } from './repos-remove-user-access-restrictions.token';
import type { ReposRemoveUserAccessRestrictionsResponse } from './repos-remove-user-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-user-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
  method: 'delete',
  tag: 'repos',
};

export function provideReposRemoveUserAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposRemoveUserAccessRestrictionsResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_USER_ACCESS_RESTRICTIONS,
    'REPOS_REMOVE_USER_ACCESS_RESTRICTIONS',
    initialBehavior,
    _meta,
    options,
  );
}
