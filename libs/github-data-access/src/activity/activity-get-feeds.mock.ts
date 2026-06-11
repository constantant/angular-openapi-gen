import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_GET_FEEDS } from './activity-get-feeds.token';
import type { ActivityGetFeedsResponse } from './activity-get-feeds.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/get-feeds',
  path: '/feeds',
  method: 'get',
  tag: 'activity',
};

export function provideActivityGetFeedsMock(
  initialBehavior?: ProviderInitialBehavior<ActivityGetFeedsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_GET_FEEDS,
    'ACTIVITY_GET_FEEDS',
    initialBehavior,
    _meta,
  );
}
