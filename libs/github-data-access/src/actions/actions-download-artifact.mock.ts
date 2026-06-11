import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DOWNLOAD_ARTIFACT } from './actions-download-artifact.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/download-artifact',
  path: '/repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsDownloadArtifactMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DOWNLOAD_ARTIFACT,
    'ACTIONS_DOWNLOAD_ARTIFACT',
    initialBehavior,
    _meta,
  );
}
