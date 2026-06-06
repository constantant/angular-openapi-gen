import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotRemoveOrganizationsFromEnterpriseCodingAgentPolicyBody =
  NonNullable<
    paths['/enterprises/{enterprise}/copilot/policies/coding_agent/organizations']['delete']['requestBody']
  >['content']['application/json'];

export const COPILOT_REMOVE_ORGANIZATIONS_FROM_ENTERPRISE_CODING_AGENT_POLICY =
  new InjectionToken<
    (
      enterprise: string,
      body:
        | CopilotRemoveOrganizationsFromEnterpriseCodingAgentPolicyBody
        | Signal<CopilotRemoveOrganizationsFromEnterpriseCodingAgentPolicyBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('COPILOT_REMOVE_ORGANIZATIONS_FROM_ENTERPRISE_CODING_AGENT_POLICY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | CopilotRemoveOrganizationsFromEnterpriseCodingAgentPolicyBody
          | Signal<CopilotRemoveOrganizationsFromEnterpriseCodingAgentPolicyBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/copilot/policies/coding_agent/organizations`,
          method: 'DELETE',
          body,
        }));
    },
  });
