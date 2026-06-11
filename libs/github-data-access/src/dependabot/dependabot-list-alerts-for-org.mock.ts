import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_ALERTS_FOR_ORG } from './dependabot-list-alerts-for-org.token';
import type { DependabotListAlertsForOrgResponse } from './dependabot-list-alerts-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/list-alerts-for-org',
  path: '/orgs/{org}/dependabot/alerts',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotListAlertsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListAlertsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_ALERTS_FOR_ORG,
    'DEPENDABOT_LIST_ALERTS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
