import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_LIST } from './enterprise-teams-list.token';
import type { EnterpriseTeamsListResponse } from './enterprise-teams-list.token';

export function provideEnterpriseTeamsListMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamsListResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_LIST,
    'ENTERPRISE_TEAMS_LIST',
    initialBehavior,
  );
}
