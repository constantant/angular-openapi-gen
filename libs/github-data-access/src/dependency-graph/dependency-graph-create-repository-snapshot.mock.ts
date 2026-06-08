import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT } from './dependency-graph-create-repository-snapshot.token';
import type { DependencyGraphCreateRepositorySnapshotResponse } from './dependency-graph-create-repository-snapshot.token';

export function provideDependencyGraphCreateRepositorySnapshotMock(
  initialBehavior?: ProviderInitialBehavior<DependencyGraphCreateRepositorySnapshotResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT,
    'DEPENDENCY_GRAPH_CREATE_REPOSITORY_SNAPSHOT',
    initialBehavior,
  );
}
