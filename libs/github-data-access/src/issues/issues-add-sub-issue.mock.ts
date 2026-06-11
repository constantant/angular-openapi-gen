import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_SUB_ISSUE } from './issues-add-sub-issue.token';
import type { IssuesAddSubIssueResponse } from './issues-add-sub-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/add-sub-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/sub_issues',
  method: 'post',
  tag: 'issues',
};

export function provideIssuesAddSubIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddSubIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_SUB_ISSUE,
    'ISSUES_ADD_SUB_ISSUE',
    initialBehavior,
    _meta,
  );
}
