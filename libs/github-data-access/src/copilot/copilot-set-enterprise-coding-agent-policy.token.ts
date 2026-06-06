import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSetEnterpriseCodingAgentPolicyBody = NonNullable<
  paths['/enterprises/{enterprise}/copilot/policies/coding_agent']['put']['requestBody']
>['content']['application/json'];

export const COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY = new InjectionToken<
  (
    enterprise: string,
    body:
      | CopilotSetEnterpriseCodingAgentPolicyBody
      | Signal<CopilotSetEnterpriseCodingAgentPolicyBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY');

export function provideCopilotSetEnterpriseCodingAgentPolicy(): FactoryProvider {
  return {
    provide: COPILOT_SET_ENTERPRISE_CODING_AGENT_POLICY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | CopilotSetEnterpriseCodingAgentPolicyBody
          | Signal<CopilotSetEnterpriseCodingAgentPolicyBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/copilot/policies/coding_agent`,
          method: 'PUT',
          body,
        }));
    },
  };
}
