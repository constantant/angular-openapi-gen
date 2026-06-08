import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_WEBHOOK } from './repos-delete-webhook.token';

export function provideReposDeleteWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_WEBHOOK,
    'REPOS_DELETE_WEBHOOK',
    initialBehavior,
  );
}
