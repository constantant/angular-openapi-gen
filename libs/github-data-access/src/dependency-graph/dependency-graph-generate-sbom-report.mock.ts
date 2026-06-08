import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDENCY_GRAPH_GENERATE_SBOM_REPORT } from './dependency-graph-generate-sbom-report.token';
import type { DependencyGraphGenerateSbomReportResponse } from './dependency-graph-generate-sbom-report.token';

export function provideDependencyGraphGenerateSbomReportMock(
  initialBehavior?: ProviderInitialBehavior<DependencyGraphGenerateSbomReportResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDENCY_GRAPH_GENERATE_SBOM_REPORT,
    'DEPENDENCY_GRAPH_GENERATE_SBOM_REPORT',
    initialBehavior,
  );
}
