import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_LIST_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION } from './copilot-list-copilot-coding-agent-selected-repositories-for-organization.token';
import type { CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationResponse } from './copilot-list-copilot-coding-agent-selected-repositories-for-organization.token';

export function provideCopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_LIST_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION,
    'COPILOT_LIST_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION',
    initialBehavior,
  );
}
