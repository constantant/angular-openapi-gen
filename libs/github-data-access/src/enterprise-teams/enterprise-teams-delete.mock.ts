import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_DELETE } from './enterprise-teams-delete.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-teams/delete',
  path: '/enterprises/{enterprise}/teams/{team_slug}',
  method: 'delete',
  tag: 'enterprise-teams',
};

export function provideEnterpriseTeamsDeleteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_DELETE,
    'ENTERPRISE_TEAMS_DELETE',
    initialBehavior,
    _meta,
  );
}
