import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_ADD_TEAM_ACCESS_RESTRICTIONS } from './repos-add-team-access-restrictions.token';
import type { ReposAddTeamAccessRestrictionsResponse } from './repos-add-team-access-restrictions.token';

export function provideReposAddTeamAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposAddTeamAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ADD_TEAM_ACCESS_RESTRICTIONS,
    'REPOS_ADD_TEAM_ACCESS_RESTRICTIONS',
    initialBehavior,
  );
}
