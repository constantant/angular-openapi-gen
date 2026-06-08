import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REDELIVER_WEBHOOK_DELIVERY } from './orgs-redeliver-webhook-delivery.token';
import type { OrgsRedeliverWebhookDeliveryResponse } from './orgs-redeliver-webhook-delivery.token';

export function provideOrgsRedeliverWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<OrgsRedeliverWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REDELIVER_WEBHOOK_DELIVERY,
    'ORGS_REDELIVER_WEBHOOK_DELIVERY',
    initialBehavior,
  );
}
