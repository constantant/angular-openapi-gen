import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_REPO_SECRET } from './actions-get-repo-secret.token';
import type { ActionsGetRepoSecretResponse } from './actions-get-repo-secret.token';

export function provideActionsGetRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_REPO_SECRET,
    'ACTIONS_GET_REPO_SECRET',
    initialBehavior,
  );
}
