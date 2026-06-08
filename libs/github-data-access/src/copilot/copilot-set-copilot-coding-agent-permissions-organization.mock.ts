import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION } from './copilot-set-copilot-coding-agent-permissions-organization.token';

export function provideCopilotSetCopilotCodingAgentPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION,
    'COPILOT_SET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION',
    initialBehavior,
  );
}
