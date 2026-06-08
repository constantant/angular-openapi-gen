import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_WEBHOOK_DELIVERIES } from './repos-list-webhook-deliveries.token';
import type { ReposListWebhookDeliveriesResponse } from './repos-list-webhook-deliveries.token';

export function provideReposListWebhookDeliveriesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListWebhookDeliveriesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_WEBHOOK_DELIVERIES,
    'REPOS_LIST_WEBHOOK_DELIVERIES',
    initialBehavior,
  );
}
