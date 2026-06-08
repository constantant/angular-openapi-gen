import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_GET_COPILOT_SEAT_DETAILS_FOR_USER } from './copilot-get-copilot-seat-details-for-user.token';
import type { CopilotGetCopilotSeatDetailsForUserResponse } from './copilot-get-copilot-seat-details-for-user.token';

export function provideCopilotGetCopilotSeatDetailsForUserMock(
  initialBehavior?: ProviderInitialBehavior<CopilotGetCopilotSeatDetailsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_GET_COPILOT_SEAT_DETAILS_FOR_USER,
    'COPILOT_GET_COPILOT_SEAT_DETAILS_FOR_USER',
    initialBehavior,
  );
}
