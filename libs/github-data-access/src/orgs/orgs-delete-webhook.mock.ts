import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_WEBHOOK } from './orgs-delete-webhook.token';

export function provideOrgsDeleteWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_WEBHOOK,
    'ORGS_DELETE_WEBHOOK',
    initialBehavior,
  );
}
