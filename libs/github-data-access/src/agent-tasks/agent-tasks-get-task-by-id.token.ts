import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentTasksGetTaskByIdResponse =
  paths['/agents/tasks/{task_id}']['get']['responses']['200']['content']['application/json'];

export const AGENT_TASKS_GET_TASK_BY_ID = new InjectionToken<
  (
    taskId: string,
  ) => ReturnType<typeof httpResource<AgentTasksGetTaskByIdResponse>>
>('AGENT_TASKS_GET_TASK_BY_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (taskId: string) =>
      httpResource<AgentTasksGetTaskByIdResponse>(() => ({
        url: `${base}/agents/tasks/${taskId}`,
      }));
  },
});
