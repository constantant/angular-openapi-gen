import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsUpdateRepoVariableBody = NonNullable<
  paths['/repos/{owner}/{repo}/agents/variables/{name}']['patch']['requestBody']
>['content']['application/json'];

export const AGENTS_UPDATE_REPO_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
    body: AgentsUpdateRepoVariableBody | Signal<AgentsUpdateRepoVariableBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('AGENTS_UPDATE_REPO_VARIABLE');

export function provideAgentsUpdateRepoVariable(): FactoryProvider {
  return {
    provide: AGENTS_UPDATE_REPO_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        name: string,
        body:
          | AgentsUpdateRepoVariableBody
          | Signal<AgentsUpdateRepoVariableBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/agents/variables/${name}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
