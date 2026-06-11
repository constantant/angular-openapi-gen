import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO } from './repos-update-webhook-config-for-repo.token';
import type { ReposUpdateWebhookConfigForRepoResponse } from './repos-update-webhook-config-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-webhook-config-for-repo',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/config',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdateWebhookConfigForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateWebhookConfigForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO,
    'REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
