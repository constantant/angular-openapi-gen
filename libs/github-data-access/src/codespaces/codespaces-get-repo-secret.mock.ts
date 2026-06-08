import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_REPO_SECRET } from './codespaces-get-repo-secret.token';
import type { CodespacesGetRepoSecretResponse } from './codespaces-get-repo-secret.token';

export function provideCodespacesGetRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_REPO_SECRET,
    'CODESPACES_GET_REPO_SECRET',
    initialBehavior,
  );
}
