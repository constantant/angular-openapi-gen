import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_LIST_ALERTS_FOR_REPO } from './dependabot-list-alerts-for-repo.token';
import type { DependabotListAlertsForRepoResponse } from './dependabot-list-alerts-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/list-alerts-for-repo',
  path: '/repos/{owner}/{repo}/dependabot/alerts',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotListAlertsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<DependabotListAlertsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_LIST_ALERTS_FOR_REPO,
    'DEPENDABOT_LIST_ALERTS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
