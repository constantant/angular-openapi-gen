import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ARTIFACT } from './actions-get-artifact.token';
import type { ActionsGetArtifactResponse } from './actions-get-artifact.token';

export function provideActionsGetArtifactMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetArtifactResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ARTIFACT,
    'ACTIONS_GET_ARTIFACT',
    initialBehavior,
  );
}
