import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_ARTIFACT } from './actions-delete-artifact.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-artifact',
  path: '/repos/{owner}/{repo}/actions/artifacts/{artifact_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteArtifactMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_ARTIFACT,
    'ACTIONS_DELETE_ARTIFACT',
    initialBehavior,
    _meta,
  );
}
