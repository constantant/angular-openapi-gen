import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_BULK_REMOVE } from './enterprise-team-memberships-bulk-remove.token';
import type { EnterpriseTeamMembershipsBulkRemoveResponse } from './enterprise-team-memberships-bulk-remove.token';

export function provideEnterpriseTeamMembershipsBulkRemoveMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsBulkRemoveResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_BULK_REMOVE,
    'ENTERPRISE_TEAM_MEMBERSHIPS_BULK_REMOVE',
    initialBehavior,
  );
}
