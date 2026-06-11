import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION } from './copilot-set-copilot-coding-agent-permissions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/set-copilot-coding-agent-permissions-organization',
  path: '/orgs/{org}/copilot/coding-agent/permissions',
  method: 'put',
  tag: 'copilot',
};

export function provideCopilotSetCopilotCodingAgentPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION,
    'COPILOT_SET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
