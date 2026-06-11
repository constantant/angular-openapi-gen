import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_TEAM_ACCESS_RESTRICTIONS } from './repos-remove-team-access-restrictions.token';
import type { ReposRemoveTeamAccessRestrictionsResponse } from './repos-remove-team-access-restrictions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-team-access-restrictions',
  path: '/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams',
  method: 'delete',
  tag: 'repos',
};

export function provideReposRemoveTeamAccessRestrictionsMock(
  initialBehavior?: ProviderInitialBehavior<ReposRemoveTeamAccessRestrictionsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_TEAM_ACCESS_RESTRICTIONS,
    'REPOS_REMOVE_TEAM_ACCESS_RESTRICTIONS',
    initialBehavior,
    _meta,
  );
}
