import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsReviewPendingDeploymentsForRunBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments']['post']['requestBody']
>['content']['application/json'];

export type ActionsReviewPendingDeploymentsForRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments']['post']['responses']['200']['content']['application/json'];

export const ACTIONS_REVIEW_PENDING_DEPLOYMENTS_FOR_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    body:
      | ActionsReviewPendingDeploymentsForRunBody
      | Signal<ActionsReviewPendingDeploymentsForRunBody>,
  ) => ReturnType<
    typeof httpResource<ActionsReviewPendingDeploymentsForRunResponse>
  >
>('ACTIONS_REVIEW_PENDING_DEPLOYMENTS_FOR_RUN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      runId: string,
      body:
        | ActionsReviewPendingDeploymentsForRunBody
        | Signal<ActionsReviewPendingDeploymentsForRunBody>,
    ) =>
      httpResource<ActionsReviewPendingDeploymentsForRunResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/pending_deployments`,
        method: 'POST',
        body,
      }));
  },
});
