import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_REPO_SECRET } from './codespaces-delete-repo-secret.token';

export function provideCodespacesDeleteRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_REPO_SECRET,
    'CODESPACES_DELETE_REPO_SECRET',
    initialBehavior,
  );
}
