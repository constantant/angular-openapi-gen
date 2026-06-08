import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_SUB_ISSUE } from './issues-remove-sub-issue.token';
import type { IssuesRemoveSubIssueResponse } from './issues-remove-sub-issue.token';

export function provideIssuesRemoveSubIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesRemoveSubIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_SUB_ISSUE,
    'ISSUES_REMOVE_SUB_ISSUE',
    initialBehavior,
  );
}
