import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationParams =
  paths['/orgs/{org}/copilot/coding-agent/permissions/repositories']['get']['parameters']['query'];

export type CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationResponse =
  paths['/orgs/{org}/copilot/coding-agent/permissions/repositories']['get']['responses']['200']['content']['application/json'];

export const COPILOT_LIST_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      params?:
        | CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationParams
        | (() =>
            | CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationResponse>
    >
  >(
    'COPILOT_LIST_COPILOT_CODING_AGENT_SELECTED_REPOSITORIES_FOR_ORGANIZATION',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(GITHUB_BASE_URL);
        return (
          org: string,
          params?:
            | CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationParams
            | (() =>
                | CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationParams
                | undefined),
        ) =>
          httpResource<CopilotListCopilotCodingAgentSelectedRepositoriesForOrganizationResponse>(
            () => ({
              url: `${base}/orgs/${org}/copilot/coding-agent/permissions/repositories`,
              params: (typeof params === 'function'
                ? params()
                : params) as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            }),
          );
      },
    },
  );
