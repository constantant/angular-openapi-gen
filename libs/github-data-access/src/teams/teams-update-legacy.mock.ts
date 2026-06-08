import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_UPDATE_LEGACY } from './teams-update-legacy.token';
import type { TeamsUpdateLegacyResponse } from './teams-update-legacy.token';

export function provideTeamsUpdateLegacyMock(
  initialBehavior?: ProviderInitialBehavior<TeamsUpdateLegacyResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_UPDATE_LEGACY,
    'TEAMS_UPDATE_LEGACY',
    initialBehavior,
  );
}
