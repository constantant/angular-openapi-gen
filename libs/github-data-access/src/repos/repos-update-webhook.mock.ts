import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_WEBHOOK } from './repos-update-webhook.token';
import type { ReposUpdateWebhookResponse } from './repos-update-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-webhook',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdateWebhookMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_WEBHOOK,
    'REPOS_UPDATE_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
