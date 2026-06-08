import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDENCY_GRAPH_FETCH_SBOM_REPORT } from './dependency-graph-fetch-sbom-report.token';

export function provideDependencyGraphFetchSbomReportMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDENCY_GRAPH_FETCH_SBOM_REPORT,
    'DEPENDENCY_GRAPH_FETCH_SBOM_REPORT',
    initialBehavior,
  );
}
