import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_SUB_ISSUES } from './issues-list-sub-issues.token';
import type { IssuesListSubIssuesResponse } from './issues-list-sub-issues.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-sub-issues',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/sub_issues',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListSubIssuesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListSubIssuesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_SUB_ISSUES,
    'ISSUES_LIST_SUB_ISSUES',
    initialBehavior,
    _meta,
  );
}
