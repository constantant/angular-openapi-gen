import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_WEBHOOKS } from './orgs-list-webhooks.token';
import type { OrgsListWebhooksResponse } from './orgs-list-webhooks.token';

export function provideOrgsListWebhooksMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListWebhooksResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_WEBHOOKS,
    'ORGS_LIST_WEBHOOKS',
    initialBehavior,
  );
}
