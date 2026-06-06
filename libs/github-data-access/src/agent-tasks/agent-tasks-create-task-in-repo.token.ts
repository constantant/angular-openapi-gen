import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentTasksCreateTaskInRepoBody = NonNullable<
  paths['/agents/repos/{owner}/{repo}/tasks']['post']['requestBody']
>['content']['application/json'];

export type AgentTasksCreateTaskInRepoResponse =
  paths['/agents/repos/{owner}/{repo}/tasks']['post']['responses']['201']['content']['application/json'];

export const AGENT_TASKS_CREATE_TASK_IN_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | AgentTasksCreateTaskInRepoBody
      | Signal<AgentTasksCreateTaskInRepoBody>,
  ) => ReturnType<typeof httpResource<AgentTasksCreateTaskInRepoResponse>>
>('AGENT_TASKS_CREATE_TASK_IN_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body:
        | AgentTasksCreateTaskInRepoBody
        | Signal<AgentTasksCreateTaskInRepoBody>,
    ) =>
      httpResource<AgentTasksCreateTaskInRepoResponse>(() => ({
        url: `${base}/agents/repos/${owner}/${repo}/tasks`,
        method: 'POST',
        body,
      }));
  },
});
