import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_ACCESS_RESTRICTIONS } from './repos-delete-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_ACCESS_RESTRICTIONS,
    'REPOS_DELETE_ACCESS_RESTRICTIONS',
    initialBehavior,
    _meta,
  );
}
