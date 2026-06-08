import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_PING_WEBHOOK } from './repos-ping-webhook.token';

export function provideReposPingWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_PING_WEBHOOK,
    'REPOS_PING_WEBHOOK',
    initialBehavior,
  );
}
