import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDENCY_GRAPH_EXPORT_SBOM } from './dependency-graph-export-sbom.token';
import type { DependencyGraphExportSbomResponse } from './dependency-graph-export-sbom.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependency-graph/export-sbom',
  path: '/repos/{owner}/{repo}/dependency-graph/sbom',
  method: 'get',
  tag: 'dependency-graph',
};

export function provideDependencyGraphExportSbomMock(
  initialBehavior?: ProviderInitialBehavior<DependencyGraphExportSbomResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDENCY_GRAPH_EXPORT_SBOM,
    'DEPENDENCY_GRAPH_EXPORT_SBOM',
    initialBehavior,
    _meta,
  );
}
