import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_GET_BY_NAME } from './teams-get-by-name.token';
import type { TeamsGetByNameResponse } from './teams-get-by-name.token';

export function provideTeamsGetByNameMock(
  initialBehavior?: ProviderInitialBehavior<TeamsGetByNameResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_GET_BY_NAME,
    'TEAMS_GET_BY_NAME',
    initialBehavior,
  );
}
