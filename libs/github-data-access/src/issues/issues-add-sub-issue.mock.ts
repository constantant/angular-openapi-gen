import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_SUB_ISSUE } from './issues-add-sub-issue.token';
import type { IssuesAddSubIssueResponse } from './issues-add-sub-issue.token';

export function provideIssuesAddSubIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddSubIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_SUB_ISSUE,
    'ISSUES_ADD_SUB_ISSUE',
    initialBehavior,
  );
}
