import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ARTIFACT } from './actions-delete-artifact.token';

export function provideActionsDeleteArtifactMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ARTIFACT,
    'ACTIONS_DELETE_ARTIFACT',
    initialBehavior,
  );
}
