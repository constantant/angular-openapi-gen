import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_SET_APP_ACCESS_RESTRICTIONS } from './repos-set-app-access-restrictions.token';
import type { ReposSetAppAccessRestrictionsResponse } from './repos-set-app-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/set-app-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
  method: 'put',
  tag: 'repos',
};

export function provideReposSetAppAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposSetAppAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_SET_APP_ACCESS_RESTRICTIONS,
    'REPOS_SET_APP_ACCESS_RESTRICTIONS',
    initialBehavior,
    _meta,
  );
}
