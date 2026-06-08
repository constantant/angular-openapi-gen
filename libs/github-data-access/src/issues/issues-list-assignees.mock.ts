import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_ASSIGNEES } from './issues-list-assignees.token';
import type { IssuesListAssigneesResponse } from './issues-list-assignees.token';

export function provideIssuesListAssigneesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListAssigneesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_ASSIGNEES,
    'ISSUES_LIST_ASSIGNEES',
    initialBehavior,
  );
}
