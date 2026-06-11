import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_ASSIGNEES } from './issues-add-assignees.token';
import type { IssuesAddAssigneesResponse } from './issues-add-assignees.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/add-assignees',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/assignees',
  method: 'post',
  tag: 'issues',
};

export function provideIssuesAddAssigneesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddAssigneesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_ASSIGNEES,
    'ISSUES_ADD_ASSIGNEES',
    initialBehavior,
    _meta,
  );
}
