import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_TEST_PUSH_WEBHOOK } from './repos-test-push-webhook.token';

export function provideReposTestPushWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_TEST_PUSH_WEBHOOK,
    'REPOS_TEST_PUSH_WEBHOOK',
    initialBehavior,
  );
}
