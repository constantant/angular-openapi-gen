import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDENCY_GRAPH_FETCH_SBOM_REPORT } from './dependency-graph-fetch-sbom-report.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependency-graph/fetch-sbom-report',
  path: '/repos/{owner}/{repo}/dependency-graph/sbom/fetch-report/{sbom_uuid}',
  method: 'get',
  tag: 'dependency-graph',
};

export function provideDependencyGraphFetchSbomReportMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDENCY_GRAPH_FETCH_SBOM_REPORT,
    'DEPENDENCY_GRAPH_FETCH_SBOM_REPORT',
    initialBehavior,
    _meta,
  );
}
