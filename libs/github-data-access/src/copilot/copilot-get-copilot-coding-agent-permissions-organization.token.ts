import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotGetCopilotCodingAgentPermissionsOrganizationResponse =
  paths['/orgs/{org}/copilot/coding-agent/permissions']['get']['responses']['200']['content']['application/json'];

export const COPILOT_GET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<CopilotGetCopilotCodingAgentPermissionsOrganizationResponse>
    >
  >('COPILOT_GET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION');

export function provideCopilotGetCopilotCodingAgentPermissionsOrganization(): FactoryProvider {
  return {
    provide: COPILOT_GET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<CopilotGetCopilotCodingAgentPermissionsOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/copilot/coding-agent/permissions`,
          }),
        );
    },
  };
}
