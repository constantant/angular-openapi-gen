import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_ADD_COPILOT_SEATS_FOR_TEAMS } from './copilot-add-copilot-seats-for-teams.token';
import type { CopilotAddCopilotSeatsForTeamsResponse } from './copilot-add-copilot-seats-for-teams.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/add-copilot-seats-for-teams',
  path: '/orgs/{org}/copilot/billing/selected_teams',
  method: 'post',
  tag: 'copilot',
};

export function provideCopilotAddCopilotSeatsForTeamsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotAddCopilotSeatsForTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_ADD_COPILOT_SEATS_FOR_TEAMS,
    'COPILOT_ADD_COPILOT_SEATS_FOR_TEAMS',
    initialBehavior,
    _meta,
  );
}
