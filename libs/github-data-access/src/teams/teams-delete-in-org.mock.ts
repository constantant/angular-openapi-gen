import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { TEAMS_DELETE_IN_ORG } from './teams-delete-in-org.token';

export function provideTeamsDeleteInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_DELETE_IN_ORG,
    'TEAMS_DELETE_IN_ORG',
    initialBehavior,
  );
}
