import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_WEBHOOK } from './repos-get-webhook.token';
import type { ReposGetWebhookResponse } from './repos-get-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-webhook',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetWebhookMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_WEBHOOK,
    'REPOS_GET_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
