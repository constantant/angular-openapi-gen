import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE } from './issues-check-user-can-be-assigned-to-issue.token';

export function provideIssuesCheckUserCanBeAssignedToIssueMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE,
    'ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE',
    initialBehavior,
  );
}
