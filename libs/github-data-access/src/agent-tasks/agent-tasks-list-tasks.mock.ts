import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENT_TASKS_LIST_TASKS } from './agent-tasks-list-tasks.token';
import type { AgentTasksListTasksResponse } from './agent-tasks-list-tasks.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agent-tasks/list-tasks',
  path: '/agents/tasks',
  method: 'get',
  tag: 'agent-tasks',
};

export function provideAgentTasksListTasksMock(
  initialBehavior?: ProviderInitialBehavior<AgentTasksListTasksResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENT_TASKS_LIST_TASKS,
    'AGENT_TASKS_LIST_TASKS',
    initialBehavior,
    _meta,
  );
}
