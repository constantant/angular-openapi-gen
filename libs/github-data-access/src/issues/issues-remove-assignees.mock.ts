import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_ASSIGNEES } from './issues-remove-assignees.token';
import type { IssuesRemoveAssigneesResponse } from './issues-remove-assignees.token';

export function provideIssuesRemoveAssigneesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesRemoveAssigneesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_ASSIGNEES,
    'ISSUES_REMOVE_ASSIGNEES',
    initialBehavior,
  );
}
