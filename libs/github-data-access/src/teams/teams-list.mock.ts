import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_LIST } from './teams-list.token';
import type { TeamsListResponse } from './teams-list.token';

export function provideTeamsListMock(
  initialBehavior?: ProviderInitialBehavior<TeamsListResponse>,
): FactoryProvider {
  return provideMockResource(TEAMS_LIST, 'TEAMS_LIST', initialBehavior);
}
