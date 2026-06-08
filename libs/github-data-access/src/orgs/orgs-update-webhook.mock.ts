import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_WEBHOOK } from './orgs-update-webhook.token';
import type { OrgsUpdateWebhookResponse } from './orgs-update-webhook.token';

export function provideOrgsUpdateWebhookMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_WEBHOOK,
    'ORGS_UPDATE_WEBHOOK',
    initialBehavior,
  );
}
