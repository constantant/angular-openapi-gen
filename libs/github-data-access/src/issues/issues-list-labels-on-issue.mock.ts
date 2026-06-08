import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_LABELS_ON_ISSUE } from './issues-list-labels-on-issue.token';
import type { IssuesListLabelsOnIssueResponse } from './issues-list-labels-on-issue.token';

export function provideIssuesListLabelsOnIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListLabelsOnIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_LABELS_ON_ISSUE,
    'ISSUES_LIST_LABELS_ON_ISSUE',
    initialBehavior,
  );
}
