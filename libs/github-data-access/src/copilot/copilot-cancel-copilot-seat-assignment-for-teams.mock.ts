import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_TEAMS } from './copilot-cancel-copilot-seat-assignment-for-teams.token';
import type { CopilotCancelCopilotSeatAssignmentForTeamsResponse } from './copilot-cancel-copilot-seat-assignment-for-teams.token';

export function provideCopilotCancelCopilotSeatAssignmentForTeamsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCancelCopilotSeatAssignmentForTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_TEAMS,
    'COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_TEAMS',
    initialBehavior,
  );
}
