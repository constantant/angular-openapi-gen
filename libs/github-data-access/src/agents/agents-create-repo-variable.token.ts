import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsCreateRepoVariableBody = NonNullable<
  paths['/repos/{owner}/{repo}/agents/variables']['post']['requestBody']
>['content']['application/json'];

export type AgentsCreateRepoVariableResponse =
  paths['/repos/{owner}/{repo}/agents/variables']['post']['responses']['201']['content']['application/json'];

export const AGENTS_CREATE_REPO_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: AgentsCreateRepoVariableBody | Signal<AgentsCreateRepoVariableBody>,
  ) => ReturnType<typeof httpResource<AgentsCreateRepoVariableResponse>>
>('AGENTS_CREATE_REPO_VARIABLE');

export function provideAgentsCreateRepoVariable(): FactoryProvider {
  return {
    provide: AGENTS_CREATE_REPO_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | AgentsCreateRepoVariableBody
          | Signal<AgentsCreateRepoVariableBody>,
      ) =>
        httpResource<AgentsCreateRepoVariableResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/agents/variables`,
          method: 'POST',
          body,
        }));
    },
  };
}
