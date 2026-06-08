import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_DELETE } from './enterprise-team-organizations-delete.token';

export function provideEnterpriseTeamOrganizationsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_DELETE,
    'ENTERPRISE_TEAM_ORGANIZATIONS_DELETE',
    initialBehavior,
  );
}
