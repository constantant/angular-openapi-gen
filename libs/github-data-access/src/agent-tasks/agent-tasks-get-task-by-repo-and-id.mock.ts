import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENT_TASKS_GET_TASK_BY_REPO_AND_ID } from './agent-tasks-get-task-by-repo-and-id.token';
import type { AgentTasksGetTaskByRepoAndIdResponse } from './agent-tasks-get-task-by-repo-and-id.token';

export function provideAgentTasksGetTaskByRepoAndIdMock(
  initialBehavior?: ProviderInitialBehavior<AgentTasksGetTaskByRepoAndIdResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENT_TASKS_GET_TASK_BY_REPO_AND_ID,
    'AGENT_TASKS_GET_TASK_BY_REPO_AND_ID',
    initialBehavior,
  );
}
