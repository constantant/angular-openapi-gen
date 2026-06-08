import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_METRICS_FOR_TEAM } from './copilot-copilot-metrics-for-team.token';
import type { CopilotCopilotMetricsForTeamResponse } from './copilot-copilot-metrics-for-team.token';

export function provideCopilotCopilotMetricsForTeamMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotMetricsForTeamResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_METRICS_FOR_TEAM,
    'COPILOT_COPILOT_METRICS_FOR_TEAM',
    initialBehavior,
  );
}
