import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_ADD_USER_ACCESS_RESTRICTIONS } from './repos-add-user-access-restrictions.token';
import type { ReposAddUserAccessRestrictionsResponse } from './repos-add-user-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/add-user-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
  method: 'post',
  tag: 'repos',
};

export function provideReposAddUserAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposAddUserAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ADD_USER_ACCESS_RESTRICTIONS,
    'REPOS_ADD_USER_ACCESS_RESTRICTIONS',
    initialBehavior,
    _meta,
  );
}
