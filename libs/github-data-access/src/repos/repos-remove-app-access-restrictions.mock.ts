import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_APP_ACCESS_RESTRICTIONS } from './repos-remove-app-access-restrictions.token';
import type { ReposRemoveAppAccessRestrictionsResponse } from './repos-remove-app-access-restrictions.token';

export function provideReposRemoveAppAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposRemoveAppAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_APP_ACCESS_RESTRICTIONS,
    'REPOS_REMOVE_APP_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
