import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_MEMBERS_IN_ORG } from './teams-list-members-in-org.token';
import type { TeamsListMembersInOrgResponse } from './teams-list-members-in-org.token';

export function provideTeamsListMembersInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListMembersInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_MEMBERS_IN_ORG,
    'TEAMS_LIST_MEMBERS_IN_ORG',
    initialBehavior,
  );
}
