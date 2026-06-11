import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_REDELIVER_WEBHOOK_DELIVERY } from './apps-redeliver-webhook-delivery.token';
import type { AppsRedeliverWebhookDeliveryResponse } from './apps-redeliver-webhook-delivery.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/redeliver-webhook-delivery',
  path: '/app/hook/deliveries/{delivery_id}/attempts',
  method: 'post',
  tag: 'apps',
};

export function provideAppsRedeliverWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<AppsRedeliverWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_REDELIVER_WEBHOOK_DELIVERY,
    'APPS_REDELIVER_WEBHOOK_DELIVERY',
    initialBehavior,
    _meta,
  );
}
