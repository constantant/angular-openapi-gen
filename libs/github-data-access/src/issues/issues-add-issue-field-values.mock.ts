import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_ISSUE_FIELD_VALUES } from './issues-add-issue-field-values.token';
import type { IssuesAddIssueFieldValuesResponse } from './issues-add-issue-field-values.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/add-issue-field-values',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values',
  method: 'post',
  tag: 'issues',
};

export function provideIssuesAddIssueFieldValuesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddIssueFieldValuesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_ISSUE_FIELD_VALUES,
    'ISSUES_ADD_ISSUE_FIELD_VALUES',
    initialBehavior,
    _meta,
  );
}
