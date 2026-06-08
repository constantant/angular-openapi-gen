import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ARTIFACTS_FOR_REPO } from './actions-list-artifacts-for-repo.token';
import type { ActionsListArtifactsForRepoResponse } from './actions-list-artifacts-for-repo.token';

export function provideActionsListArtifactsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListArtifactsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ARTIFACTS_FOR_REPO,
    'ACTIONS_LIST_ARTIFACTS_FOR_REPO',
    initialBehavior,
  );
}
