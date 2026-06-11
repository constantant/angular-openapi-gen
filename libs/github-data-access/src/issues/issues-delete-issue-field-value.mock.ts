import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_DELETE_ISSUE_FIELD_VALUE } from './issues-delete-issue-field-value.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/delete-issue-field-value',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values/{issue_field_id}',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesDeleteIssueFieldValueMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_DELETE_ISSUE_FIELD_VALUE,
    'ISSUES_DELETE_ISSUE_FIELD_VALUE',
    initialBehavior,
    _meta,
  );
}
