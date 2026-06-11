import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_ASSIGNEES } from './issues-remove-assignees.token';
import type { IssuesRemoveAssigneesResponse } from './issues-remove-assignees.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/remove-assignees',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/assignees',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesRemoveAssigneesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesRemoveAssigneesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_ASSIGNEES,
    'ISSUES_REMOVE_ASSIGNEES',
    initialBehavior,
    _meta,
  );
}
