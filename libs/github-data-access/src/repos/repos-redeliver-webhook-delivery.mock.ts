import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_REDELIVER_WEBHOOK_DELIVERY } from './repos-redeliver-webhook-delivery.token';
import type { ReposRedeliverWebhookDeliveryResponse } from './repos-redeliver-webhook-delivery.token';

export function provideReposRedeliverWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<ReposRedeliverWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REDELIVER_WEBHOOK_DELIVERY,
    'REPOS_REDELIVER_WEBHOOK_DELIVERY',
    initialBehavior,
  );
}
