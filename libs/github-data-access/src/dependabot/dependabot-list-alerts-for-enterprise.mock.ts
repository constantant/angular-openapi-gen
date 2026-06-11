import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE } from './dependabot-list-alerts-for-enterprise.token';
import type { DependabotListAlertsForEnterpriseResponse } from './dependabot-list-alerts-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/list-alerts-for-enterprise',
  path: '/enterprises/{enterprise}/dependabot/alerts',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotListAlertsForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListAlertsForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE,
    'DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
