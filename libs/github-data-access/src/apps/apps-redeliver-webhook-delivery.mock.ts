import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_REDELIVER_WEBHOOK_DELIVERY } from './apps-redeliver-webhook-delivery.token';
import type { AppsRedeliverWebhookDeliveryResponse } from './apps-redeliver-webhook-delivery.token';

export function provideAppsRedeliverWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<AppsRedeliverWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_REDELIVER_WEBHOOK_DELIVERY,
    'APPS_REDELIVER_WEBHOOK_DELIVERY',
    initialBehavior,
  );
}
