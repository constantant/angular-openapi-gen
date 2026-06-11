import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_LIST_WEBHOOK_DELIVERIES } from './apps-list-webhook-deliveries.token';
import type { AppsListWebhookDeliveriesResponse } from './apps-list-webhook-deliveries.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/list-webhook-deliveries',
  path: '/app/hook/deliveries',
  method: 'get',
  tag: 'apps',
};

export function provideAppsListWebhookDeliveriesMock(
  initialBehavior?: ProviderInitialBehavior<AppsListWebhookDeliveriesResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_WEBHOOK_DELIVERIES,
    'APPS_LIST_WEBHOOK_DELIVERIES',
    initialBehavior,
    _meta,
  );
}
