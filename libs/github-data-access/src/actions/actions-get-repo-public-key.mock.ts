import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_REPO_PUBLIC_KEY } from './actions-get-repo-public-key.token';
import type { ActionsGetRepoPublicKeyResponse } from './actions-get-repo-public-key.token';

export function provideActionsGetRepoPublicKeyMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetRepoPublicKeyResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_REPO_PUBLIC_KEY,
    'ACTIONS_GET_REPO_PUBLIC_KEY',
    initialBehavior,
  );
}
