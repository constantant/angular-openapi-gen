import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENT_TASKS_CREATE_TASK_IN_REPO } from './agent-tasks-create-task-in-repo.token';
import type { AgentTasksCreateTaskInRepoResponse } from './agent-tasks-create-task-in-repo.token';

export function provideAgentTasksCreateTaskInRepoMock(
  initialBehavior?: ProviderInitialBehavior<AgentTasksCreateTaskInRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENT_TASKS_CREATE_TASK_IN_REPO,
    'AGENT_TASKS_CREATE_TASK_IN_REPO',
    initialBehavior,
  );
}
