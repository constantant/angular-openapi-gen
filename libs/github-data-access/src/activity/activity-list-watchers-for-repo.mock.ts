import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_WATCHERS_FOR_REPO } from './activity-list-watchers-for-repo.token';
import type { ActivityListWatchersForRepoResponse } from './activity-list-watchers-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-watchers-for-repo',
  path: '/repos/{owner}/{repo}/subscribers',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListWatchersForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListWatchersForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_WATCHERS_FOR_REPO,
    'ACTIVITY_LIST_WATCHERS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
