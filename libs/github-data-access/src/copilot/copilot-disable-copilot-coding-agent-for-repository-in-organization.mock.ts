import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_DISABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION } from './copilot-disable-copilot-coding-agent-for-repository-in-organization.token';

export function provideCopilotDisableCopilotCodingAgentForRepositoryInOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_DISABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION,
    'COPILOT_DISABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION',
    initialBehavior,
  );
}
