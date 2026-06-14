import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentTasksListTasksForRepoParams =
  paths['/agents/repos/{owner}/{repo}/tasks']['get']['parameters']['query'];

export type AgentTasksListTasksForRepoResponse =
  paths['/agents/repos/{owner}/{repo}/tasks']['get']['responses']['200']['content']['application/json'];

export const AGENT_TASKS_LIST_TASKS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | AgentTasksListTasksForRepoParams
      | (() => AgentTasksListTasksForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<AgentTasksListTasksForRepoResponse>>
>('AGENT_TASKS_LIST_TASKS_FOR_REPO');

export function provideAgentTasksListTasksForRepo(): FactoryProvider {
  return {
    provide: AGENT_TASKS_LIST_TASKS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | AgentTasksListTasksForRepoParams
          | (() => AgentTasksListTasksForRepoParams | undefined),
      ) =>
        httpResource<AgentTasksListTasksForRepoResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/agents/repos/${owner}/${repo}/tasks`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
