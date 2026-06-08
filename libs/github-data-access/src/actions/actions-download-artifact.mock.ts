import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DOWNLOAD_ARTIFACT } from './actions-download-artifact.token';

export function provideActionsDownloadArtifactMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DOWNLOAD_ARTIFACT,
    'ACTIONS_DOWNLOAD_ARTIFACT',
    initialBehavior,
  );
}
