import { InjectionToken, inject } from '@angular/core';
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
>('AGENT_TASKS_LIST_TASKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?:
        | AgentTasksListTasksParams
        | (() => AgentTasksListTasksParams | undefined),
    ) =>
      httpResource<AgentTasksListTasksResponse>(() => ({
        url: `${base}/agents/tasks`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
