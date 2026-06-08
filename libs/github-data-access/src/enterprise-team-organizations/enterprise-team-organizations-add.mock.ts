import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_ADD } from './enterprise-team-organizations-add.token';
import type { EnterpriseTeamOrganizationsAddResponse } from './enterprise-team-organizations-add.token';

export function provideEnterpriseTeamOrganizationsAddMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamOrganizationsAddResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_ADD,
    'ENTERPRISE_TEAM_ORGANIZATIONS_ADD',
    initialBehavior,
  );
}
