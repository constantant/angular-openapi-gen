import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { APPS_GET_WEBHOOK_CONFIG_FOR_APP } from './apps-get-webhook-config-for-app.token';
import type { AppsGetWebhookConfigForAppResponse } from './apps-get-webhook-config-for-app.token';

export function provideAppsGetWebhookConfigForAppMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetWebhookConfigForAppResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_WEBHOOK_CONFIG_FOR_APP,
    'APPS_GET_WEBHOOK_CONFIG_FOR_APP',
    initialBehavior,
  );
}
