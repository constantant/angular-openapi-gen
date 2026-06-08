import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_ALERTS_FOR_REPO } from './dependabot-list-alerts-for-repo.token';
import type { DependabotListAlertsForRepoResponse } from './dependabot-list-alerts-for-repo.token';

export function provideDependabotListAlertsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListAlertsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_ALERTS_FOR_REPO,
    'DEPENDABOT_LIST_ALERTS_FOR_REPO',
    initialBehavior,
  );
}
