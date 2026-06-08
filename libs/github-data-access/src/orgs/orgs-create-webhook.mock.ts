import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_WEBHOOK } from './orgs-create-webhook.token';
import type { OrgsCreateWebhookResponse } from './orgs-create-webhook.token';

export function provideOrgsCreateWebhookMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_WEBHOOK,
    'ORGS_CREATE_WEBHOOK',
    initialBehavior,
  );
}
