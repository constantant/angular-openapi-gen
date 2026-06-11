import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_ADD_ORGANIZATIONS_TO_ENTERPRISE_CODING_AGENT_POLICY } from './copilot-add-organizations-to-enterprise-coding-agent-policy.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/add-organizations-to-enterprise-coding-agent-policy',
  path: '/enterprises/{enterprise}/copilot/policies/coding_agent/organizations',
  method: 'post',
  tag: 'copilot',
};

export function provideCopilotAddOrganizationsToEnterpriseCodingAgentPolicyMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_ADD_ORGANIZATIONS_TO_ENTERPRISE_CODING_AGENT_POLICY,
    'COPILOT_ADD_ORGANIZATIONS_TO_ENTERPRISE_CODING_AGENT_POLICY',
    initialBehavior,
    _meta,
  );
}
