import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE } from './dependabot-list-alerts-for-enterprise.token';
import type { DependabotListAlertsForEnterpriseResponse } from './dependabot-list-alerts-for-enterprise.token';

export function provideDependabotListAlertsForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListAlertsForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE,
    'DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE',
    initialBehavior,
  );
}
