import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_REMOVE_ORGANIZATIONS_FROM_ENTERPRISE_CODING_AGENT_POLICY } from './copilot-remove-organizations-from-enterprise-coding-agent-policy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'copilot/remove-organizations-from-enterprise-coding-agent-policy',
  path: '/enterprises/{enterprise}/copilot/policies/coding_agent/organizations',
  method: 'delete',
  tag: 'copilot',
};

export function provideCopilotRemoveOrganizationsFromEnterpriseCodingAgentPolicyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_REMOVE_ORGANIZATIONS_FROM_ENTERPRISE_CODING_AGENT_POLICY,
    'COPILOT_REMOVE_ORGANIZATIONS_FROM_ENTERPRISE_CODING_AGENT_POLICY',
    initialBehavior,
    _meta,
  );
}
