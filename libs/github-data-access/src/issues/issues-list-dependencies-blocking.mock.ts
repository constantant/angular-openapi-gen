import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_DEPENDENCIES_BLOCKING } from './issues-list-dependencies-blocking.token';
import type { IssuesListDependenciesBlockingResponse } from './issues-list-dependencies-blocking.token';

export function provideIssuesListDependenciesBlockingMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListDependenciesBlockingResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_DEPENDENCIES_BLOCKING,
    'ISSUES_LIST_DEPENDENCIES_BLOCKING',
    initialBehavior,
  );
}
