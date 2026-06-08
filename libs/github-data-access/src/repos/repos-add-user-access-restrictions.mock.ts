import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_ADD_USER_ACCESS_RESTRICTIONS } from './repos-add-user-access-restrictions.token';
import type { ReposAddUserAccessRestrictionsResponse } from './repos-add-user-access-restrictions.token';

export function provideReposAddUserAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposAddUserAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ADD_USER_ACCESS_RESTRICTIONS,
    'REPOS_ADD_USER_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
