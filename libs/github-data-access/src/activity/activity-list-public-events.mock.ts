import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_PUBLIC_EVENTS } from './activity-list-public-events.token';
import type { ActivityListPublicEventsResponse } from './activity-list-public-events.token';

export function provideActivityListPublicEventsMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListPublicEventsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_PUBLIC_EVENTS,
    'ACTIVITY_LIST_PUBLIC_EVENTS',
    initialBehavior,
  );
}
