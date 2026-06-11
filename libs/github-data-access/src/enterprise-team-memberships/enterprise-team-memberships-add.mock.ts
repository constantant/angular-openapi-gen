import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_ADD } from './enterprise-team-memberships-add.token';
import type { EnterpriseTeamMembershipsAddResponse } from './enterprise-team-memberships-add.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-memberships/add',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}',
  method: 'put',
  tag: 'enterprise-team-memberships',
};

export function provideEnterpriseTeamMembershipsAddMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsAddResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_ADD,
    'ENTERPRISE_TEAM_MEMBERSHIPS_ADD',
    initialBehavior,
    _meta,
  );
}
