import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_METRICS_FOR_ORGANIZATION } from './copilot-copilot-metrics-for-organization.token';
import type { CopilotCopilotMetricsForOrganizationResponse } from './copilot-copilot-metrics-for-organization.token';

export function provideCopilotCopilotMetricsForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotMetricsForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_METRICS_FOR_ORGANIZATION,
    'COPILOT_COPILOT_METRICS_FOR_ORGANIZATION',
    initialBehavior,
  );
}
