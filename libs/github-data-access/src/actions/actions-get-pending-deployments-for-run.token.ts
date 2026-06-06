import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetPendingDeploymentsForRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetPendingDeploymentsForRunResponse>
  >
>('ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN');

export function provideActionsGetPendingDeploymentsForRun(): FactoryProvider {
  return {
    provide: ACTIONS_GET_PENDING_DEPLOYMENTS_FOR_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runId: string) =>
        httpResource<ActionsGetPendingDeploymentsForRunResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/pending_deployments`,
        }));
    },
  };
}
