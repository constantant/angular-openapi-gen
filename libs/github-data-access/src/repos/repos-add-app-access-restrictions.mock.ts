import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_ADD_APP_ACCESS_RESTRICTIONS } from './repos-add-app-access-restrictions.token';
import type { ReposAddAppAccessRestrictionsResponse } from './repos-add-app-access-restrictions.token';

export function provideReposAddAppAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposAddAppAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ADD_APP_ACCESS_RESTRICTIONS,
    'REPOS_ADD_APP_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
