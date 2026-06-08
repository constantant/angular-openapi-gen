import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_UPDATE } from './enterprise-teams-update.token';
import type { EnterpriseTeamsUpdateResponse } from './enterprise-teams-update.token';

export function provideEnterpriseTeamsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_UPDATE,
    'ENTERPRISE_TEAMS_UPDATE',
    initialBehavior,
  );
}
