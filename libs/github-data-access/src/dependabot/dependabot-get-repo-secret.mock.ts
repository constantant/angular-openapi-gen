import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_GET_REPO_SECRET } from './dependabot-get-repo-secret.token';
import type { DependabotGetRepoSecretResponse } from './dependabot-get-repo-secret.token';

export function provideDependabotGetRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<DependabotGetRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_GET_REPO_SECRET,
    'DEPENDABOT_GET_REPO_SECRET',
    initialBehavior,
  );
}
