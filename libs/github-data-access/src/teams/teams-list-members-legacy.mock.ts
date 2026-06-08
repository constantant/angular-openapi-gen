import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_MEMBERS_LEGACY } from './teams-list-members-legacy.token';
import type { TeamsListMembersLegacyResponse } from './teams-list-members-legacy.token';

export function provideTeamsListMembersLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListMembersLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_MEMBERS_LEGACY,
    'TEAMS_LIST_MEMBERS_LEGACY',
    initialBehavior,
  );
}
