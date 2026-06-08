import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_SET_APP_ACCESS_RESTRICTIONS } from './repos-set-app-access-restrictions.token';
import type { ReposSetAppAccessRestrictionsResponse } from './repos-set-app-access-restrictions.token';

export function provideReposSetAppAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposSetAppAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_SET_APP_ACCESS_RESTRICTIONS,
    'REPOS_SET_APP_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
