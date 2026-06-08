import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE } from './enterprise-team-organizations-bulk-remove.token';

export function provideEnterpriseTeamOrganizationsBulkRemoveMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE,
    'ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE',
    initialBehavior,
  );
}
