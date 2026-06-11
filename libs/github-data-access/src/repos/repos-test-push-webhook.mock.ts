import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_TEST_PUSH_WEBHOOK } from './repos-test-push-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/test-push-webhook',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/tests',
  method: 'post',
  tag: 'repos',
};

export function provideReposTestPushWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_TEST_PUSH_WEBHOOK,
    'REPOS_TEST_PUSH_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
