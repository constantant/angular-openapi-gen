import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_ISSUE_FIELD_VALUES_FOR_ISSUE } from './issues-list-issue-field-values-for-issue.token';
import type { IssuesListIssueFieldValuesForIssueResponse } from './issues-list-issue-field-values-for-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-issue-field-values-for-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListIssueFieldValuesForIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListIssueFieldValuesForIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_ISSUE_FIELD_VALUES_FOR_ISSUE,
    'ISSUES_LIST_ISSUE_FIELD_VALUES_FOR_ISSUE',
    initialBehavior,
    _meta,
  );
}
