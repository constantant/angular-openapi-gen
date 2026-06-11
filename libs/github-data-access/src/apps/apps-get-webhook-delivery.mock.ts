import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_GET_WEBHOOK_DELIVERY } from './apps-get-webhook-delivery.token';
import type { AppsGetWebhookDeliveryResponse } from './apps-get-webhook-delivery.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/get-webhook-delivery',
  path: '/app/hook/deliveries/{delivery_id}',
  method: 'get',
  tag: 'apps',
};

export function provideAppsGetWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_WEBHOOK_DELIVERY,
    'APPS_GET_WEBHOOK_DELIVERY',
    initialBehavior,
    _meta,
  );
}
