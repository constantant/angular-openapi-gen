import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const COPILOT_DISABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('COPILOT_DISABLE_COPILOT_CODING_AGENT_FOR_REPOSITORY_IN_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/copilot/coding-agent/permissions/repositories/${repositoryId}`,
          method: 'DELETE',
        }));
    },
  });
