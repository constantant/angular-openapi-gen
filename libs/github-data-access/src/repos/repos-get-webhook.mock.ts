import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_WEBHOOK } from './repos-get-webhook.token';
import type { ReposGetWebhookResponse } from './repos-get-webhook.token';

export function provideReposGetWebhookMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_WEBHOOK,
    'REPOS_GET_WEBHOOK',
    initialBehavior,
  );
}
