import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const COPILOT_ENABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('COPILOT_ENABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION');

export function provideCopilotEnableCopilotCodingAgentForRepositoryInOrganization(): FactoryProvider {
  return {
    provide: COPILOT_ENABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/copilot/coding-agent/permissions/repositories/${repositoryId}`,
          method: 'PUT',
        }));
    },
  };
}
