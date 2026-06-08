import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_UPDATE_IN_ORG } from './teams-update-in-org.token';
import type { TeamsUpdateInOrgResponse } from './teams-update-in-org.token';

export function provideTeamsUpdateInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsUpdateInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_UPDATE_IN_ORG,
    'TEAMS_UPDATE_IN_ORG',
    initialBehavior,
  );
}
