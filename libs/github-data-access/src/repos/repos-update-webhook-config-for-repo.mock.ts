import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO } from './repos-update-webhook-config-for-repo.token';
import type { ReposUpdateWebhookConfigForRepoResponse } from './repos-update-webhook-config-for-repo.token';

export function provideReposUpdateWebhookConfigForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateWebhookConfigForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO,
    'REPOS_UPDATE_WEBHOOK_CONFIG_FOR_REPO',
    initialBehavior,
  );
}
