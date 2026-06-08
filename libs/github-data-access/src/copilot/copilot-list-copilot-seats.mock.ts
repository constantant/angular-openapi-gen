import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_LIST_COPILOT_SEATS } from './copilot-list-copilot-seats.token';
import type { CopilotListCopilotSeatsResponse } from './copilot-list-copilot-seats.token';

export function provideCopilotListCopilotSeatsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotListCopilotSeatsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_LIST_COPILOT_SEATS,
    'COPILOT_LIST_COPILOT_SEATS',
    initialBehavior,
  );
}
