import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_PUBLIC_EVENTS_FOR_REPO_NETWORK } from './activity-list-public-events-for-repo-network.token';
import type { ActivityListPublicEventsForRepoNetworkResponse } from './activity-list-public-events-for-repo-network.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-public-events-for-repo-network',
  path: '/networks/{owner}/{repo}/events',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListPublicEventsForRepoNetworkMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListPublicEventsForRepoNetworkResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_PUBLIC_EVENTS_FOR_REPO_NETWORK,
    'ACTIVITY_LIST_PUBLIC_EVENTS_FOR_REPO_NETWORK',
    initialBehavior,
    _meta,
  );
}
