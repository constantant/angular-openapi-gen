import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_FORCE_CANCEL_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_FORCE_CANCEL_WORKFLOW_RUN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, runId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/force-cancel`,
        method: 'POST',
      }));
  },
});
