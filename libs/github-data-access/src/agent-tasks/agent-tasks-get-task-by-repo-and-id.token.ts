import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentTasksGetTaskByRepoAndIdResponse =
  paths['/agents/repos/{owner}/{repo}/tasks/{task_id}']['get']['responses']['200']['content']['application/json'];

export const AGENT_TASKS_GET_TASK_BY_REPO_AND_ID = new InjectionToken<
  (
    owner: string,
    repo: string,
    taskId: string,
  ) => ReturnType<typeof httpResource<AgentTasksGetTaskByRepoAndIdResponse>>
>('AGENT_TASKS_GET_TASK_BY_REPO_AND_ID');

export function provideAgentTasksGetTaskByRepoAndId(): FactoryProvider {
  return {
    provide: AGENT_TASKS_GET_TASK_BY_REPO_AND_ID,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, taskId: string) =>
        httpResource<AgentTasksGetTaskByRepoAndIdResponse>(() => ({
          url: `${base}/agents/repos/${owner}/${repo}/tasks/${taskId}`,
        }));
    },
  };
}
