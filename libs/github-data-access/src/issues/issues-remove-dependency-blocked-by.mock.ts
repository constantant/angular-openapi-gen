import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY } from './issues-remove-dependency-blocked-by.token';
import type { IssuesRemoveDependencyBlockedByResponse } from './issues-remove-dependency-blocked-by.token';

export function provideIssuesRemoveDependencyBlockedByMock(
  initialBehavior?: ProviderInitialBehavior<IssuesRemoveDependencyBlockedByResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY,
    'ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY',
    initialBehavior,
  );
}
