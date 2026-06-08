import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_ISSUE_FIELD_VALUES } from './issues-add-issue-field-values.token';
import type { IssuesAddIssueFieldValuesResponse } from './issues-add-issue-field-values.token';

export function provideIssuesAddIssueFieldValuesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddIssueFieldValuesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_ISSUE_FIELD_VALUES,
    'ISSUES_ADD_ISSUE_FIELD_VALUES',
    initialBehavior,
  );
}
