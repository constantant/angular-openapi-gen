import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DOWNLOAD_WORKFLOW_RUN_ATTEMPT_LOGS = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    attemptNumber: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DOWNLOAD_WORKFLOW_RUN_ATTEMPT_LOGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      runId: string,
      attemptNumber: string,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/attempts/${attemptNumber}/logs`,
      }));
  },
});
