import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_USERS } from './copilot-cancel-copilot-seat-assignment-for-users.token';
import type { CopilotCancelCopilotSeatAssignmentForUsersResponse } from './copilot-cancel-copilot-seat-assignment-for-users.token';

export function provideCopilotCancelCopilotSeatAssignmentForUsersMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCancelCopilotSeatAssignmentForUsersResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_USERS,
    'COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_USERS',
    initialBehavior,
  );
}
