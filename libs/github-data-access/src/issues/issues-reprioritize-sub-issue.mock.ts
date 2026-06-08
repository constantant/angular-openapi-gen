import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_REPRIORITIZE_SUB_ISSUE } from './issues-reprioritize-sub-issue.token';
import type { IssuesReprioritizeSubIssueResponse } from './issues-reprioritize-sub-issue.token';

export function provideIssuesReprioritizeSubIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesReprioritizeSubIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REPRIORITIZE_SUB_ISSUE,
    'ISSUES_REPRIORITIZE_SUB_ISSUE',
    initialBehavior,
  );
}
