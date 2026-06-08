import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_REPO_EVENTS } from './activity-list-repo-events.token';
import type { ActivityListRepoEventsResponse } from './activity-list-repo-events.token';

export function provideActivityListRepoEventsMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListRepoEventsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_REPO_EVENTS,
    'ACTIVITY_LIST_REPO_EVENTS',
    initialBehavior,
  );
}
