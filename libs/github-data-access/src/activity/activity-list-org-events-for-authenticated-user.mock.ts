import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_LIST_ORG_EVENTS_FOR_AUTHENTICATED_USER } from './activity-list-org-events-for-authenticated-user.token';
import type { ActivityListOrgEventsForAuthenticatedUserResponse } from './activity-list-org-events-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/list-org-events-for-authenticated-user',
  path: '/users/{username}/events/orgs/{org}',
  method: 'get',
  tag: 'activity',
};

export function provideActivityListOrgEventsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ActivityListOrgEventsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_LIST_ORG_EVENTS_FOR_AUTHENTICATED_USER,
    'ACTIVITY_LIST_ORG_EVENTS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
