import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_DELETE_REPO_SECRET } from './dependabot-delete-repo-secret.token';

export function provideDependabotDeleteRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_DELETE_REPO_SECRET,
    'DEPENDABOT_DELETE_REPO_SECRET',
    initialBehavior,
  );
}
