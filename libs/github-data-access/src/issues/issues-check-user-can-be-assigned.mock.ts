import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_CHECK_USER_CAN_BE_ASSIGNED } from './issues-check-user-can-be-assigned.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/check-user-can-be-assigned',
  path: '/repos/{owner}/{repo}/assignees/{assignee}',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesCheckUserCanBeAssignedMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CHECK_USER_CAN_BE_ASSIGNED,
    'ISSUES_CHECK_USER_CAN_BE_ASSIGNED',
    initialBehavior,
    _meta,
  );
}
