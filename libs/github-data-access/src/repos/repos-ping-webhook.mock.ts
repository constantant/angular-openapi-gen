import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_PING_WEBHOOK } from './repos-ping-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/ping-webhook',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/pings',
  method: 'post',
  tag: 'repos',
};

export function provideReposPingWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_PING_WEBHOOK,
    'REPOS_PING_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
