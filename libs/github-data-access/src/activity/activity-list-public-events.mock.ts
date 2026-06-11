import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_PUBLIC_EVENTS } from './activity-list-public-events.token';
import type { ActivityListPublicEventsResponse } from './activity-list-public-events.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-public-events',
  path: '/events',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListPublicEventsMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListPublicEventsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_PUBLIC_EVENTS,
    'ACTIVITY_LIST_PUBLIC_EVENTS',
    initialBehavior,
    _meta,
  );
}
