import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENTS_DELETE_REPO_SECRET } from './agents-delete-repo-secret.token';

export function provideAgentsDeleteRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    AGENTS_DELETE_REPO_SECRET,
    'AGENTS_DELETE_REPO_SECRET',
    initialBehavior,
  );
}
