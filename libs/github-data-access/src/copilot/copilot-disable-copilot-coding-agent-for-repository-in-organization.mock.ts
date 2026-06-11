import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_DISABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION } from './copilot-disable-copilot-coding-agent-for-repository-in-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'copilot/disable-copilot-coding-agent-for-repository-in-organization',
  path: '/orgs/{org}/copilot/coding-agent/permissions/repositories/{repository_id}',
  method: 'delete',
  tag: 'copilot',
};

export function provideCopilotDisableCopilotCodingAgentForRepositoryInOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_DISABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION,
    'COPILOT_DISABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
