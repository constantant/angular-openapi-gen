import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentTasksListTasksParams =
  paths['/agents/tasks']['get']['parameters']['query'];

export type AgentTasksListTasksResponse =
  paths['/agents/tasks']['get']['responses']['200']['content']['application/json'];

export const AGENT_TASKS_LIST_TASKS = new InjectionToken<
  (
    params?:
      | AgentTasksListTasksParams
      | (() => AgentTasksListTasksParams | undefined),
  ) => ReturnType<typeof httpResource<AgentTasksListTasksResponse>>
>('AGENT_TASKS_LIST_TASKS');

export function provideAgentTasksListTasks(): FactoryProvider {
  return {
    provide: AGENT_TASKS_LIST_TASKS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AgentTasksListTasksParams
          | (() => AgentTasksListTasksParams | undefined),
      ) =>
        httpResource<AgentTasksListTasksResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/agents/tasks`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
