import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_WEBHOOK } from './repos-update-webhook.token';
import type { ReposUpdateWebhookResponse } from './repos-update-webhook.token';

export function provideReposUpdateWebhookMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_WEBHOOK,
    'REPOS_UPDATE_WEBHOOK',
    initialBehavior,
  );
}
