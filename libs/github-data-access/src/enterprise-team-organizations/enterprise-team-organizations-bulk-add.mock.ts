import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_BULK_ADD } from './enterprise-team-organizations-bulk-add.token';
import type { EnterpriseTeamOrganizationsBulkAddResponse } from './enterprise-team-organizations-bulk-add.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-organizations/bulk-add',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/organizations/add',
  method: 'post',
  tag: 'enterprise-team-organizations',
};

export function provideEnterpriseTeamOrganizationsBulkAddMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamOrganizationsBulkAddResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_BULK_ADD,
    'ENTERPRISE_TEAM_ORGANIZATIONS_BULK_ADD',
    initialBehavior,
    _meta,
  );
}
