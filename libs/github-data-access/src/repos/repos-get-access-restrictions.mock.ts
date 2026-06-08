import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ACCESS_RESTRICTIONS } from './repos-get-access-restrictions.token';
import type { ReposGetAccessRestrictionsResponse } from './repos-get-access-restrictions.token';

export function provideReposGetAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ACCESS_RESTRICTIONS,
    'REPOS_GET_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
