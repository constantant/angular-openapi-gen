import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_USER_ACCESS_RESTRICTIONS } from './repos-remove-user-access-restrictions.token';
import type { ReposRemoveUserAccessRestrictionsResponse } from './repos-remove-user-access-restrictions.token';

export function provideReposRemoveUserAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposRemoveUserAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_USER_ACCESS_RESTRICTIONS,
    'REPOS_REMOVE_USER_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
