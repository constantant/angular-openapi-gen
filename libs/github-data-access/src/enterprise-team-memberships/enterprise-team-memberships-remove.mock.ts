import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAM_MEMBERSHIPS_REMOVE } from './enterprise-team-memberships-remove.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-team-memberships/remove',
  path: '/enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}',
  method: 'delete',
  tag: 'enterprise-team-memberships',
};

export function provideEnterpriseTeamMembershipsRemoveMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAM_MEMBERSHIPS_REMOVE,
    'ENTERPRISE_TEAM_MEMBERSHIPS_REMOVE',
    initialBehavior,
    _meta,
  );
}
