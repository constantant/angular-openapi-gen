import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_LIST_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION } from './copilot-list-copilot-coding-agent-selected-repositories-for-organization.token';
import type { CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationResponse } from './copilot-list-copilot-coding-agent-selected-repositories-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'copilot/list-copilot-coding-agent-selected-repositories-for-organization',
  path: '/orgs/{org}/copilot/coding-agent/permissions/repositories',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_LIST_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION,
    'COPILOT_LIST_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
