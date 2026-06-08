import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDENCY_GRAPH_DIFF_RANGE } from './dependency-graph-diff-range.token';
import type { DependencyGraphDiffRangeResponse } from './dependency-graph-diff-range.token';

export function provideDependencyGraphDiffRangeMock(
  initialBehavior?: ProviderInitialBehavior<DependencyGraphDiffRangeResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDENCY_GRAPH_DIFF_RANGE,
    'DEPENDENCY_GRAPH_DIFF_RANGE',
    initialBehavior,
  );
}
