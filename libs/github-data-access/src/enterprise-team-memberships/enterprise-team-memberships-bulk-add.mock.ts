import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_BULK_ADD } from './enterprise-team-memberships-bulk-add.token';
import type { EnterpriseTeamMembershipsBulkAddResponse } from './enterprise-team-memberships-bulk-add.token';

export function provideEnterpriseTeamMembershipsBulkAddMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsBulkAddResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_BULK_ADD,
    'ENTERPRISE_TEAM_MEMBERSHIPS_BULK_ADD',
    initialBehavior,
  );
}
