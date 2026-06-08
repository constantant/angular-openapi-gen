import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDENCY_GRAPH_EXPORT_SBOM } from './dependency-graph-export-sbom.token';
import type { DependencyGraphExportSbomResponse } from './dependency-graph-export-sbom.token';

export function provideDependencyGraphExportSbomMock(
  initialBehavior?: ProviderInitialBehavior<DependencyGraphExportSbomResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDENCY_GRAPH_EXPORT_SBOM,
    'DEPENDENCY_GRAPH_EXPORT_SBOM',
    initialBehavior,
  );
}
