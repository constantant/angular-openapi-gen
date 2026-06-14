import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_PUBLIC_ORG_EVENTS } from './activity-list-public-org-events.token';
import type { ActivityListPublicOrgEventsResponse } from './activity-list-public-org-events.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-public-org-events',
  path: '/orgs/{org}/events',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListPublicOrgEventsMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListPublicOrgEventsResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_PUBLIC_ORG_EVENTS,
    'ACTIVITY_LIST_PUBLIC_ORG_EVENTS',
    initialBehavior,
    _meta,
    options,
  );
}
