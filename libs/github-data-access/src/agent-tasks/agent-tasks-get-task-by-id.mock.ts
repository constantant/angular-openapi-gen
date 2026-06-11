import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENT_TASKS_GET_TASK_BY_ID } from './agent-tasks-get-task-by-id.token';
import type { AgentTasksGetTaskByIdResponse } from './agent-tasks-get-task-by-id.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agent-tasks/get-task-by-id',
  path: '/agents/tasks/{task_id}',
  method: 'get',
  tag: 'agent-tasks',
};

export function provideAgentTasksGetTaskByIdMock(
  initialBehavior?: ProviderInitialBehavior<AgentTasksGetTaskByIdResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENT_TASKS_GET_TASK_BY_ID,
    'AGENT_TASKS_GET_TASK_BY_ID',
    initialBehavior,
    _meta,
  );
}
