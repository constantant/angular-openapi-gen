import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_BULK_ADD } from './enterprise-team-memberships-bulk-add.token';
import type { EnterpriseTeamMembershipsBulkAddResponse } from './enterprise-team-memberships-bulk-add.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-memberships/bulk-add',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/memberships/add',
  method: 'post',
  tag: 'enterprise-team-memberships',
};

export function provideEnterpriseTeamMembershipsBulkAddMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsBulkAddResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_BULK_ADD,
    'ENTERPRISE_TEAM_MEMBERSHIPS_BULK_ADD',
    initialBehavior,
    _meta,
  );
}
