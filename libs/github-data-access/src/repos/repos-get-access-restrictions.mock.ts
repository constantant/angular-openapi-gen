import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ACCESS_RESTRICTIONS } from './repos-get-access-restrictions.token';
import type { ReposGetAccessRestrictionsResponse } from './repos-get-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ACCESS_RESTRICTIONS,
    'REPOS_GET_ACCESS_RESTRICTIONS',
    initialBehavior,
    _meta,
  );
}
