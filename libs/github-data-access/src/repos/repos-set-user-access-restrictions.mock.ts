import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_SET_USER_ACCESS_RESTRICTIONS } from './repos-set-user-access-restrictions.token';
import type { ReposSetUserAccessRestrictionsResponse } from './repos-set-user-access-restrictions.token';

export function provideReposSetUserAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposSetUserAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_SET_USER_ACCESS_RESTRICTIONS,
    'REPOS_SET_USER_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
