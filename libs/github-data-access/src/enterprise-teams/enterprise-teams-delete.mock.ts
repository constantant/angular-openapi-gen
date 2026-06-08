import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_DELETE } from './enterprise-teams-delete.token';

export function provideEnterpriseTeamsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_DELETE,
    'ENTERPRISE_TEAMS_DELETE',
    initialBehavior,
  );
}
