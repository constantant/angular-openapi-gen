import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_LEGACY } from './teams-get-legacy.token';
import type { TeamsGetLegacyResponse } from './teams-get-legacy.token';

export function provideTeamsGetLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsGetLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_LEGACY,
    'TEAMS_GET_LEGACY',
    initialBehavior,
  );
}
