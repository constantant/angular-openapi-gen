import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_ASSIGNEES } from './issues-add-assignees.token';
import type { IssuesAddAssigneesResponse } from './issues-add-assignees.token';

export function provideIssuesAddAssigneesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddAssigneesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_ASSIGNEES,
    'ISSUES_ADD_ASSIGNEES',
    initialBehavior,
  );
}
