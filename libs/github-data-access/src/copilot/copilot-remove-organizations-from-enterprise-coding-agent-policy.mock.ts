import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_REMOVE_ORGANIZATIONS_FROM_ENTERPRISE_CODING_AGENT_POLICY } from './copilot-remove-organizations-from-enterprise-coding-agent-policy.token';

export function provideCopilotRemoveOrganizationsFromEnterpriseCodingAgentPolicyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_REMOVE_ORGANIZATIONS_FROM_ENTERPRISE_CODING_AGENT_POLICY,
    'COPILOT_REMOVE_ORGANIZATIONS_FROM_ENTERPRISE_CODING_AGENT_POLICY',
    initialBehavior,
  );
}
