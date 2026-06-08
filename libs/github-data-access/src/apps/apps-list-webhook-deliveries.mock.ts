import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_LIST_WEBHOOK_DELIVERIES } from './apps-list-webhook-deliveries.token';
import type { AppsListWebhookDeliveriesResponse } from './apps-list-webhook-deliveries.token';

export function provideAppsListWebhookDeliveriesMock(
  initialBehavior?: ProviderInitialBehavior<AppsListWebhookDeliveriesResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_WEBHOOK_DELIVERIES,
    'APPS_LIST_WEBHOOK_DELIVERIES',
    initialBehavior,
  );
}
