import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_REPO_SECRET } from './actions-delete-repo-secret.token';

export function provideActionsDeleteRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_REPO_SECRET,
    'ACTIONS_DELETE_REPO_SECRET',
    initialBehavior,
  );
}
