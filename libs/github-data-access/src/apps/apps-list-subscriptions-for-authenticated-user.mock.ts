import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER } from './apps-list-subscriptions-for-authenticated-user.token';
import type { AppsListSubscriptionsForAuthenticatedUserResponse } from './apps-list-subscriptions-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/list-subscriptions-for-authenticated-user',
  path: '/user/marketplace_purchases',
  method: 'get',
  tag: 'apps',
};

export function provideAppsListSubscriptionsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<AppsListSubscriptionsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER,
    'APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
