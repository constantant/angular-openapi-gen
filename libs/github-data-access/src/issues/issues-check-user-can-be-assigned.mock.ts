import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_CHECK_USER_CAN_BE_ASSIGNED } from './issues-check-user-can-be-assigned.token';

export function provideIssuesCheckUserCanBeAssignedMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CHECK_USER_CAN_BE_ASSIGNED,
    'ISSUES_CHECK_USER_CAN_BE_ASSIGNED',
    initialBehavior,
  );
}
