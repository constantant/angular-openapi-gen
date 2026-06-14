import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsReviewCustomGatesForRunBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule']['post']['requestBody']
>['content']['application/json'];

export const ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN = new InjectionToken<
  (
    owner: string,
    repo: string,
    runId: string,
    body:
      | ActionsReviewCustomGatesForRunBody
      | Signal<ActionsReviewCustomGatesForRunBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN');

export function provideActionsReviewCustomGatesForRun(): FactoryProvider {
  return {
    provide: ACTIONS_REVIEW_CUSTOM_GATES_FOR_RUN,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        runId: string,
        body:
          | ActionsReviewCustomGatesForRunBody
          | Signal<ActionsReviewCustomGatesForRunBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/runs/${runId}/deployment_protection_rule`,
          method: 'POST',
          body,
        }));
    },
  };
}
