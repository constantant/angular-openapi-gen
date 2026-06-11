import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_BULK_REMOVE } from './enterprise-team-memberships-bulk-remove.token';
import type { EnterpriseTeamMembershipsBulkRemoveResponse } from './enterprise-team-memberships-bulk-remove.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-memberships/bulk-remove',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/memberships/remove',
  method: 'post',
  tag: 'enterprise-team-memberships',
};

export function provideEnterpriseTeamMembershipsBulkRemoveMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsBulkRemoveResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_BULK_REMOVE,
    'ENTERPRISE_TEAM_MEMBERSHIPS_BULK_REMOVE',
    initialBehavior,
    _meta,
  );
}
