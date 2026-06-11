import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE } from './issues-check-user-can-be-assigned-to-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/check-user-can-be-assigned-to-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesCheckUserCanBeAssignedToIssueMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE,
    'ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE',
    initialBehavior,
    _meta,
  );
}
