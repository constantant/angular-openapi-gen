import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_WEBHOOK } from './repos-create-webhook.token';
import type { ReposCreateWebhookResponse } from './repos-create-webhook.token';

export function provideReposCreateWebhookMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_WEBHOOK,
    'REPOS_CREATE_WEBHOOK',
    initialBehavior,
  );
}
