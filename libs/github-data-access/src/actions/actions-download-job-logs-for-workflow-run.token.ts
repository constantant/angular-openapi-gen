import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DOWNLOAD_JOB_LOGS_FOR_WORKFLOW_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    jobId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DOWNLOAD_JOB_LOGS_FOR_WORKFLOW_RUN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, jobId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/jobs/${jobId}/logs`,
      }));
  },
});
