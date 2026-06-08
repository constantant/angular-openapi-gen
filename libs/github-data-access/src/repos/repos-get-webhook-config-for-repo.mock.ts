import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_WEBHOOK_CONFIG_FOR_REPO } from './repos-get-webhook-config-for-repo.token';
import type { ReposGetWebhookConfigForRepoResponse } from './repos-get-webhook-config-for-repo.token';

export function provideReposGetWebhookConfigForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetWebhookConfigForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_WEBHOOK_CONFIG_FOR_REPO,
    'REPOS_GET_WEBHOOK_CONFIG_FOR_REPO',
    initialBehavior,
  );
}
