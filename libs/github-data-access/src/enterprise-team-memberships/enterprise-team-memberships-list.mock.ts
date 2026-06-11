import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_LIST } from './enterprise-team-memberships-list.token';
import type { EnterpriseTeamMembershipsListResponse } from './enterprise-team-memberships-list.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-memberships/list',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/memberships',
  method: 'get',
  tag: 'enterprise-team-memberships',
};

export function provideEnterpriseTeamMembershipsListMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsListResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_LIST,
    'ENTERPRISE_TEAM_MEMBERSHIPS_LIST',
    initialBehavior,
    _meta,
  );
}
