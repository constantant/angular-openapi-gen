import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_PING_WEBHOOK } from './orgs-ping-webhook.token';

export function provideOrgsPingWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_PING_WEBHOOK,
    'ORGS_PING_WEBHOOK',
    initialBehavior,
  );
}
