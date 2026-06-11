import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_ORGANIZATIONS_ADD } from './enterprise-team-organizations-add.token';
import type { EnterpriseTeamOrganizationsAddResponse } from './enterprise-team-organizations-add.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-organizations/add',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}',
  method: 'put',
  tag: 'enterprise-team-organizations',
};

export function provideEnterpriseTeamOrganizationsAddMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamOrganizationsAddResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_ORGANIZATIONS_ADD,
    'ENTERPRISE_TEAM_ORGANIZATIONS_ADD',
    initialBehavior,
    _meta,
  );
}
