import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST_CHILD_LEGACY } from './teams-list-child-legacy.token';
import type { TeamsListChildLegacyResponse } from './teams-list-child-legacy.token';

export function provideTeamsListChildLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListChildLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_LIST_CHILD_LEGACY,
    'TEAMS_LIST_CHILD_LEGACY',
    initialBehavior,
  );
}
