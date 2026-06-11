import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_UPDATE_WEBHOOK_CONFIG_FOR_APP } from './apps-update-webhook-config-for-app.token';
import type { AppsUpdateWebhookConfigForAppResponse } from './apps-update-webhook-config-for-app.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/update-webhook-config-for-app',
  path: '/app/hook/config',
  method: 'patch',
  tag: 'apps',
};

export function provideAppsUpdateWebhookConfigForAppMock(
  initialBehavior?: ProviderInitialBehavior<AppsUpdateWebhookConfigForAppResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_UPDATE_WEBHOOK_CONFIG_FOR_APP,
    'APPS_UPDATE_WEBHOOK_CONFIG_FOR_APP',
    initialBehavior,
    _meta,
  );
}
