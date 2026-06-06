import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSetCopilotCodingAgentPermissionsOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/copilot/coding-agent/permissions']['put']['requestBody']
  >['content']['application/json'];

export const COPILOT_SET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | CopilotSetCopilotCodingAgentPermissionsOrganizationBody
        | Signal<CopilotSetCopilotCodingAgentPermissionsOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('COPILOT_SET_COPILOT_CODING_AGENT_PERMISSIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CopilotSetCopilotCodingAgentPermissionsOrganizationBody
          | Signal<CopilotSetCopilotCodingAgentPermissionsOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/copilot/coding-agent/permissions`,
          method: 'PUT',
          body,
        }));
    },
  });
