import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_ALERTS_FOR_ORG } from './dependabot-list-alerts-for-org.token';
import type { DependabotListAlertsForOrgResponse } from './dependabot-list-alerts-for-org.token';

export function provideDependabotListAlertsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListAlertsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_ALERTS_FOR_ORG,
    'DEPENDABOT_LIST_ALERTS_FOR_ORG',
    initialBehavior,
  );
}
