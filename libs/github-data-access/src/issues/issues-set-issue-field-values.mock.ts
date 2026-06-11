import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_SET_ISSUE_FIELD_VALUES } from './issues-set-issue-field-values.token';
import type { IssuesSetIssueFieldValuesResponse } from './issues-set-issue-field-values.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/set-issue-field-values',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values',
  method: 'put',
  tag: 'issues',
};

export function provideIssuesSetIssueFieldValuesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesSetIssueFieldValuesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_SET_ISSUE_FIELD_VALUES,
    'ISSUES_SET_ISSUE_FIELD_VALUES',
    initialBehavior,
    _meta,
  );
}
