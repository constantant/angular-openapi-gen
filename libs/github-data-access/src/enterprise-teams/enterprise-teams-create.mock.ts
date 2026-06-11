import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ENTERPRISE_TEAMS_CREATE } from './enterprise-teams-create.token';
import type { EnterpriseTeamsCreateResponse } from './enterprise-teams-create.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'enterprise-teams/create',
  path: '/enterprises/{enterprise}/teams',
  method: 'post',
  tag: 'enterprise-teams',
};

export function provideEnterpriseTeamsCreateMock(
  initialBehavior?: ProviderInitialBehavior<EnterpriseTeamsCreateResponse>,
): FactoryProvider {
  return provideMockResource(
    ENTERPRISE_TEAMS_CREATE,
    'ENTERPRISE_TEAMS_CREATE',
    initialBehavior,
    _meta,
  );
}
