import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SET_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION } from './copilot-set-copilot-coding-agent-selected-repositories-for-organization.token';

export function provideCopilotSetCopilotCodingAgentSelectedRepositoriesForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SET_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION,
    'COPILOT_SET_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION',
    initialBehavior,
  );
}
