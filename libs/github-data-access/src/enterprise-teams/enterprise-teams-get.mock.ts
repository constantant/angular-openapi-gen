import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_GET } from './enterprise-teams-get.token';
import type { EnterpriseTeamsGetResponse } from './enterprise-teams-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-teams/get',
  path: '/enterprises/{enterprise}/teams/{team_slug}',
  method: 'get',
  tag: 'enterprise-teams',
};

export function provideEnterpriseTeamsGetMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamsGetResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_GET,
    'ENTERPRISE_TEAMS_GET',
    initialBehavior,
    _meta,
  );
}
