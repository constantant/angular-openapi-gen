import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE } from './enterprise-team-organizations-bulk-remove.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-organizations/bulk-remove',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/organizations/remove',
  method: 'post',
  tag: 'enterprise-team-organizations',
};

export function provideEnterpriseTeamOrganizationsBulkRemoveMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE,
    'ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE',
    initialBehavior,
    _meta,
  );
}
