import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_GET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION } from './copilot-get-copilot-coding-agent-permissions-organization.token';
import type { CopilotGetCopilotCodingAgentPermissionsOrganizationResponse } from './copilot-get-copilot-coding-agent-permissions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/get-copilot-coding-agent-permissions-organization',
  path: '/orgs/{org}/copilot/coding-agent/permissions',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotGetCopilotCodingAgentPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotGetCopilotCodingAgentPermissionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_GET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION,
    'COPILOT_GET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
