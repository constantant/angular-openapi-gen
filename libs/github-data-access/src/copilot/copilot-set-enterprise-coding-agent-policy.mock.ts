import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY } from './copilot-set-enterprise-coding-agent-policy.token';

export function provideCopilotSetEnterpriseCodingAgentPolicyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY,
    'COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY',
    initialBehavior,
  );
}
