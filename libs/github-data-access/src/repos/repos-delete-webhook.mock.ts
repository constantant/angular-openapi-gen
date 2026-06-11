import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_WEBHOOK } from './repos-delete-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-webhook',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_WEBHOOK,
    'REPOS_DELETE_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
