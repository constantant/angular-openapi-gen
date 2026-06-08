import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_PUBLIC_ORG_EVENTS } from './activity-list-public-org-events.token';
import type { ActivityListPublicOrgEventsResponse } from './activity-list-public-org-events.token';

export function provideActivityListPublicOrgEventsMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListPublicOrgEventsResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_PUBLIC_ORG_EVENTS,
    'ACTIVITY_LIST_PUBLIC_ORG_EVENTS',
    initialBehavior,
  );
}
