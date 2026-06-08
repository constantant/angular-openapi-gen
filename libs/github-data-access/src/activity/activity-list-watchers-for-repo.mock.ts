import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_WATCHERS_FOR_REPO } from './activity-list-watchers-for-repo.token';
import type { ActivityListWatchersForRepoResponse } from './activity-list-watchers-for-repo.token';

export function provideActivityListWatchersForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListWatchersForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_WATCHERS_FOR_REPO,
    'ACTIVITY_LIST_WATCHERS_FOR_REPO',
    initialBehavior,
  );
}
