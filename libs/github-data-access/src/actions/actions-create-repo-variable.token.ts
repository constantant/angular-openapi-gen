import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateRepoVariableBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/variables']['post']['requestBody']
>['content']['application/json'];

export type ActionsCreateRepoVariableResponse =
  paths['/repos/{owner}/{repo}/actions/variables']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_REPO_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ActionsCreateRepoVariableBody | Signal<ActionsCreateRepoVariableBody>,
  ) => ReturnType<typeof httpResource<ActionsCreateRepoVariableResponse>>
>('ACTIONS_CREATE_REPO_VARIABLE');

export function provideActionsCreateRepoVariable(): FactoryProvider {
  return {
    provide: ACTIONS_CREATE_REPO_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsCreateRepoVariableBody
          | Signal<ActionsCreateRepoVariableBody>,
      ) =>
        httpResource<ActionsCreateRepoVariableResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/variables`,
          method: 'POST',
          body,
        }));
    },
  };
}
