import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSetCopilotCodingAgentSelectedRepositoriesForOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/copilot/coding-agent/permissions/repositories']['put']['requestBody']
  >['content']['application/json'];

export const COPILOT_SET_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | CopilotSetCopilotCodingAgentSelectedRepositoriesForOrganizationBody
        | Signal<CopilotSetCopilotCodingAgentSelectedRepositoriesForOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('COPILOT_SET_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CopilotSetCopilotCodingAgentSelectedRepositoriesForOrganizationBody
          | Signal<CopilotSetCopilotCodingAgentSelectedRepositoriesForOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/copilot/coding-agent/permissions/repositories`,
          method: 'PUT',
          body,
        }));
    },
  });
