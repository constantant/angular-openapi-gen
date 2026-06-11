import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_DELETE } from './enterprise-team-organizations-delete.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-organizations/delete',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}',
  method: 'delete',
  tag: 'enterprise-team-organizations',
};

export function provideEnterpriseTeamOrganizationsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_DELETE,
    'ENTERPRISE_TEAM_ORGANIZATIONS_DELETE',
    initialBehavior,
    _meta,
  );
}
