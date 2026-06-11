import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_SUB_ISSUE } from './issues-remove-sub-issue.token';
import type { IssuesRemoveSubIssueResponse } from './issues-remove-sub-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/remove-sub-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/sub_issue',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesRemoveSubIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesRemoveSubIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_SUB_ISSUE,
    'ISSUES_REMOVE_SUB_ISSUE',
    initialBehavior,
    _meta,
  );
}
