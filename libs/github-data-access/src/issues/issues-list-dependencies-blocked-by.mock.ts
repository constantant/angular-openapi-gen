import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_DEPENDENCIES_BLOCKED_BY } from './issues-list-dependencies-blocked-by.token';
import type { IssuesListDependenciesBlockedByResponse } from './issues-list-dependencies-blocked-by.token';

export function provideIssuesListDependenciesBlockedByMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListDependenciesBlockedByResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_DEPENDENCIES_BLOCKED_BY,
    'ISSUES_LIST_DEPENDENCIES_BLOCKED_BY',
    initialBehavior,
  );
}
