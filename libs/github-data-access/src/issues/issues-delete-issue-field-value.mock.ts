import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_DELETE_ISSUE_FIELD_VALUE } from './issues-delete-issue-field-value.token';

export function provideIssuesDeleteIssueFieldValueMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_DELETE_ISSUE_FIELD_VALUE,
    'ISSUES_DELETE_ISSUE_FIELD_VALUE',
    initialBehavior,
  );
}
