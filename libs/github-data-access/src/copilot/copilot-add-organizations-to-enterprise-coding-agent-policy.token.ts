import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotAddOrganizationsToEnterpriseCodingAgentPolicyBody =
  NonNullable<
    paths['/enterprises/{enterprise}/copilot/policies/coding_agent/organizations']['post']['requestBody']
  >['content']['application/json'];

export const COPILOT_ADD_ORGANIZATIONS_TO_ENTERPRISE_CODING_AGENT_POLICY =
  new InjectionToken<
    (
      enterprise: string,
      body:
        | CopilotAddOrganizationsToEnterpriseCodingAgentPolicyBody
        | Signal<CopilotAddOrganizationsToEnterpriseCodingAgentPolicyBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('COPILOT_ADD_ORGANIZATIONS_TO_ENTERPRISE_CODING_AGENT_POLICY');

export function provideCopilotAddOrganizationsToEnterpriseCodingAgentPolicy(): FactoryProvider {
  return {
    provide: COPILOT_ADD_ORGANIZATIONS_TO_ENTERPRISE_CODING_AGENT_POLICY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | CopilotAddOrganizationsToEnterpriseCodingAgentPolicyBody
          | Signal<CopilotAddOrganizationsToEnterpriseCodingAgentPolicyBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/copilot/policies/coding_agent/organizations`,
          method: 'POST',
          body,
        }));
    },
  };
}
