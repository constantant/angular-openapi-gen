import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { AGENT_TASKS_GET_TASK_BY_ID } from './agent-tasks-get-task-by-id.token';
import type { AgentTasksGetTaskByIdResponse } from './agent-tasks-get-task-by-id.token';

export function provideAgentTasksGetTaskByIdMock(
  initialBehavior?: ProviderInitialBehavior<AgentTasksGetTaskByIdResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENT_TASKS_GET_TASK_BY_ID,
    'AGENT_TASKS_GET_TASK_BY_ID',
    initialBehavior,
  );
}
