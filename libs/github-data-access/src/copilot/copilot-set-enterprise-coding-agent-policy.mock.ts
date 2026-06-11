import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY } from './copilot-set-enterprise-coding-agent-policy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/set-enterprise-coding-agent-policy',
  path: '/enterprises/{enterprise}/copilot/policies/coding_agent',
  method: 'put',
  tag: 'copilot',
};

export function provideCopilotSetEnterpriseCodingAgentPolicyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY,
    'COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY',
    initialBehavior,
    _meta,
  );
}
