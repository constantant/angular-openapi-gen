import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_ACCESS_RESTRICTIONS } from './repos-delete-access-restrictions.token';

export function provideReposDeleteAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_ACCESS_RESTRICTIONS,
    'REPOS_DELETE_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
