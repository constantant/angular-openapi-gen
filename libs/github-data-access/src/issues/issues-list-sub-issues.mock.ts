import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_SUB_ISSUES } from './issues-list-sub-issues.token';
import type { IssuesListSubIssuesResponse } from './issues-list-sub-issues.token';

export function provideIssuesListSubIssuesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListSubIssuesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_SUB_ISSUES,
    'ISSUES_LIST_SUB_ISSUES',
    initialBehavior,
  );
}
