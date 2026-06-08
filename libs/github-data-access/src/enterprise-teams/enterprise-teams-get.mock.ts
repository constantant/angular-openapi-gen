import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_GET } from './enterprise-teams-get.token';
import type { EnterpriseTeamsGetResponse } from './enterprise-teams-get.token';

export function provideEnterpriseTeamsGetMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamsGetResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_GET,
    'ENTERPRISE_TEAMS_GET',
    initialBehavior,
  );
}
