import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_TEAMS } from './copilot-cancel-copilot-seat-assignment-for-teams.token';
import type { CopilotCancelCopilotSeatAssignmentForTeamsResponse } from './copilot-cancel-copilot-seat-assignment-for-teams.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/cancel-copilot-seat-assignment-for-teams',
  path: '/orgs/{org}/copilot/billing/selected_teams',
  method: 'delete',
  tag: 'copilot',
};

export function provideCopilotCancelCopilotSeatAssignmentForTeamsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCancelCopilotSeatAssignmentForTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_TEAMS,
    'COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_TEAMS',
    initialBehavior,
    _meta,
  );
}
