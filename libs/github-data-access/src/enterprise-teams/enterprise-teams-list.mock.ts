import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_LIST } from './enterprise-teams-list.token';
import type { EnterpriseTeamsListResponse } from './enterprise-teams-list.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-teams/list',
  path: '/enterprises/{enterprise}/teams',
  method: 'get',
  tag: 'enterprise-teams',
};

export function provideEnterpriseTeamsListMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamsListResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_LIST,
    'ENTERPRISE_TEAMS_LIST',
    initialBehavior,
    _meta,
  );
}
