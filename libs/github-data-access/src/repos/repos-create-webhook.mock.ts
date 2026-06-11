import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_WEBHOOK } from './repos-create-webhook.token';
import type { ReposCreateWebhookResponse } from './repos-create-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-webhook',
  path: '/repos/{owner}/{repo}/hooks',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateWebhookMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_WEBHOOK,
    'REPOS_CREATE_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
