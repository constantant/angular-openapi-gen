import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_LABELS_ON_ISSUE } from './issues-list-labels-on-issue.token';
import type { IssuesListLabelsOnIssueResponse } from './issues-list-labels-on-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-labels-on-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/labels',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListLabelsOnIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListLabelsOnIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_LABELS_ON_ISSUE,
    'ISSUES_LIST_LABELS_ON_ISSUE',
    initialBehavior,
    _meta,
  );
}
