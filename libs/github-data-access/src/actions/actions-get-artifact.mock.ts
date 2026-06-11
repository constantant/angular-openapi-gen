import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_ARTIFACT } from './actions-get-artifact.token';
import type { ActionsGetArtifactResponse } from './actions-get-artifact.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-artifact',
  path: '/repos/{owner}/{repo}/actions/artifacts/{artifact_id}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetArtifactMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetArtifactResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_ARTIFACT,
    'ACTIONS_GET_ARTIFACT',
    initialBehavior,
    _meta,
  );
}
