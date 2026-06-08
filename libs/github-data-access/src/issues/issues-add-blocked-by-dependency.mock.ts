import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_BLOCKED_BY_DEPENDENCY } from './issues-add-blocked-by-dependency.token';
import type { IssuesAddBlockedByDependencyResponse } from './issues-add-blocked-by-dependency.token';

export function provideIssuesAddBlockedByDependencyMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddBlockedByDependencyResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_BLOCKED_BY_DEPENDENCY,
    'ISSUES_ADD_BLOCKED_BY_DEPENDENCY',
    initialBehavior,
  );
}
