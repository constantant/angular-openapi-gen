import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_GET_COPILOT_CLOUD_AGENT_CONFIGURATION } from './copilot-get-copilot-cloud-agent-configuration.token';
import type { CopilotGetCopilotCloudAgentConfigurationResponse } from './copilot-get-copilot-cloud-agent-configuration.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/get-copilot-cloud-agent-configuration',
  path: '/repos/{owner}/{repo}/copilot/cloud-agent/configuration',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotGetCopilotCloudAgentConfigurationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotGetCopilotCloudAgentConfigurationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_GET_COPILOT_CLOUD_AGENT_CONFIGURATION,
    'COPILOT_GET_COPILOT_CLOUD_AGENT_CONFIGURATION',
    initialBehavior,
    _meta,
  );
}
