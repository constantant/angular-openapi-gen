import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_WEBHOOK_CONFIG_FOR_REPO } from './repos-get-webhook-config-for-repo.token';
import type { ReposGetWebhookConfigForRepoResponse } from './repos-get-webhook-config-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-webhook-config-for-repo',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/config',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetWebhookConfigForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetWebhookConfigForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_WEBHOOK_CONFIG_FOR_REPO,
    'REPOS_GET_WEBHOOK_CONFIG_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
