import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_GET_COPILOT_CLOUD_AGENT_CONFIGURATION } from './copilot-get-copilot-cloud-agent-configuration.token';
import type { CopilotGetCopilotCloudAgentConfigurationResponse } from './copilot-get-copilot-cloud-agent-configuration.token';

export function provideCopilotGetCopilotCloudAgentConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotGetCopilotCloudAgentConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_GET_COPILOT_CLOUD_AGENT_CONFIGURATION,
    'COPILOT_GET_COPILOT_CLOUD_AGENT_CONFIGURATION',
    initialBehavior,
  );
}
