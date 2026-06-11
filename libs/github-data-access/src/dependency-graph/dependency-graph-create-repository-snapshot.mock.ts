import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT } from './dependency-graph-create-repository-snapshot.token';
import type { DependencyGraphCreateRepositorySnapshotResponse } from './dependency-graph-create-repository-snapshot.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependency-graph/create-repository-snapshot',
  path: '/repos/{owner}/{repo}/dependency-graph/snapshots',
  method: 'post',
  tag: 'dependency-graph',
};

export function provideDependencyGraphCreateRepositorySnapshotMock(
  initialBehavior?: ProviderInitialBehavior<DependencyGraphCreateRepositorySnapshotResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT,
    'DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT',
    initialBehavior,
    _meta,
  );
}
