import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_PUBLIC_EVENTS_FOR_REPO_NETWORK } from './activity-list-public-events-for-repo-network.token';
import type { ActivityListPublicEventsForRepoNetworkResponse } from './activity-list-public-events-for-repo-network.token';

export function provideActivityListPublicEventsForRepoNetworkMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListPublicEventsForRepoNetworkResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_PUBLIC_EVENTS_FOR_REPO_NETWORK,
    'ACTIVITY_LIST_PUBLIC_EVENTS_FOR_REPO_NETWORK',
    initialBehavior,
  );
}
