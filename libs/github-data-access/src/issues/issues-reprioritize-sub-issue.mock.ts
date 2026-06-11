import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_REPRIORITIZE_SUB_ISSUE } from './issues-reprioritize-sub-issue.token';
import type { IssuesReprioritizeSubIssueResponse } from './issues-reprioritize-sub-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/reprioritize-sub-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority',
  method: 'patch',
  tag: 'issues',
};

export function provideIssuesReprioritizeSubIssueMock(
  initialBehavior?: ProviderInitialBehavior<IssuesReprioritizeSubIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REPRIORITIZE_SUB_ISSUE,
    'ISSUES_REPRIORITIZE_SUB_ISSUE',
    initialBehavior,
    _meta,
  );
}
