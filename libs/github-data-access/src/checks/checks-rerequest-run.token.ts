import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksRerequestRunResponse =
  paths['/repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest']['post']['responses']['201']['content']['application/json'];

export const CHECKS_REREQUEST_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    checkRunId: string,
  ) => ReturnType<typeof httpResource<ChecksRerequestRunResponse>>
>('CHECKS_REREQUEST_RUN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, checkRunId: string) =>
      httpResource<ChecksRerequestRunResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/check-runs/${checkRunId}/rerequest`,
        method: 'POST',
      }));
  },
});
