import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_WEBHOOKS } from './repos-list-webhooks.token';
import type { ReposListWebhooksResponse } from './repos-list-webhooks.token';

export function provideReposListWebhooksMock(
  initialBehavior?: ProviderInitialBehavior<ReposListWebhooksResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_WEBHOOKS,
    'REPOS_LIST_WEBHOOKS',
    initialBehavior,
  );
}
