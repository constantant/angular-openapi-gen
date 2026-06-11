import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_UPDATE } from './enterprise-teams-update.token';
import type { EnterpriseTeamsUpdateResponse } from './enterprise-teams-update.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-teams/update',
  path: '/enterprises/{enterprise}/teams/{team_slug}',
  method: 'patch',
  tag: 'enterprise-teams',
};

export function provideEnterpriseTeamsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_UPDATE,
    'ENTERPRISE_TEAMS_UPDATE',
    initialBehavior,
    _meta,
  );
}
