import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_OR_UPDATE_REPO_SECRET } from './actions-create-or-update-repo-secret.token';
import type { ActionsCreateOrUpdateRepoSecretResponse } from './actions-create-or-update-repo-secret.token';

export function provideActionsCreateOrUpdateRepoSecretMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateOrUpdateRepoSecretResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_OR_UPDATE_REPO_SECRET,
    'ACTIONS_CREATE_OR_UPDATE_REPO_SECRET',
    initialBehavior,
  );
}
