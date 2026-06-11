import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_GET } from './enterprise-team-memberships-get.token';
import type { EnterpriseTeamMembershipsGetResponse } from './enterprise-team-memberships-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-memberships/get',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}',
  method: 'get',
  tag: 'enterprise-team-memberships',
};

export function provideEnterpriseTeamMembershipsGetMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamMembershipsGetResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_GET,
    'ENTERPRISE_TEAM_MEMBERSHIPS_GET',
    initialBehavior,
    _meta,
  );
}
