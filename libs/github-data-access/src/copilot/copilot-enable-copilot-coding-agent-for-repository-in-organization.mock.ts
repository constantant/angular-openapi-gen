import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_ENABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION } from './copilot-enable-copilot-coding-agent-for-repository-in-organization.token';

export function provideCopilotEnableCopilotCodingAgentForRepositoryInOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_ENABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION,
    'COPILOT_ENABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION',
    initialBehavior,
  );
}
