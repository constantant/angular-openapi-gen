import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_WEBHOOK_DELIVERY } from './repos-get-webhook-delivery.token';
import type { ReposGetWebhookDeliveryResponse } from './repos-get-webhook-delivery.token';

export function provideReposGetWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_WEBHOOK_DELIVERY,
    'REPOS_GET_WEBHOOK_DELIVERY',
    initialBehavior,
  );
}
