import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetReviewsForRunResponse =
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/approvals']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_REVIEWS_FOR_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
  ) => ReturnType<typeof httpResource<ActionsGetReviewsForRunResponse>>
>('ACTIONS_GET_REVIEWS_FOR_RUN');

export function provideActionsGetReviewsForRun(): FactoryProvider {
  return {
    provide: ACTIONS_GET_REVIEWS_FOR_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, runId: string) =>
        httpResource<ActionsGetReviewsForRunResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/approvals`,
        }));
    },
  };
}
