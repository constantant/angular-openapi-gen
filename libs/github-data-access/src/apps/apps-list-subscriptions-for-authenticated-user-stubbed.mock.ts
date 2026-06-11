import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER_STUBBED } from './apps-list-subscriptions-for-authenticated-user-stubbed.token';
import type { AppsListSubscriptionsForAuthenticatedUserStubbedResponse } from './apps-list-subscriptions-for-authenticated-user-stubbed.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/list-subscriptions-for-authenticated-user-stubbed',
  path: '/user/marketplace_purchases/stubbed',
  method: 'get',
  tag: 'apps',
};

export function provideAppsListSubscriptionsForAuthenticatedUserStubbedMock(
  initialBehavior?: ProviderInitialBehavior<AppsListSubscriptionsForAuthenticatedUserStubbedResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER_STUBBED,
    'APPS_LIST_SUBSCRIPTIONS_FOR_AUTHENTICATED_USER_STUBBED',
    initialBehavior,
    _meta,
  );
}
