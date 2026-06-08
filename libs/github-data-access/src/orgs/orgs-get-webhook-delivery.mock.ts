import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_WEBHOOK_DELIVERY } from './orgs-get-webhook-delivery.token';
import type { OrgsGetWebhookDeliveryResponse } from './orgs-get-webhook-delivery.token';

export function provideOrgsGetWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_WEBHOOK_DELIVERY,
    'ORGS_GET_WEBHOOK_DELIVERY',
    initialBehavior,
  );
}
