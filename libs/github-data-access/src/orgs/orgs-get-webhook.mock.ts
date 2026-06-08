import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_WEBHOOK } from './orgs-get-webhook.token';
import type { OrgsGetWebhookResponse } from './orgs-get-webhook.token';

export function provideOrgsGetWebhookMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_WEBHOOK,
    'ORGS_GET_WEBHOOK',
    initialBehavior,
  );
}
