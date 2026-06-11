import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_ARTIFACTS_FOR_REPO } from './actions-list-artifacts-for-repo.token';
import type { ActionsListArtifactsForRepoResponse } from './actions-list-artifacts-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-artifacts-for-repo',
  path: '/repos/{owner}/{repo}/actions/artifacts',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListArtifactsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListArtifactsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_ARTIFACTS_FOR_REPO,
    'ACTIONS_LIST_ARTIFACTS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
