import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENT_TASKS_GET_TASK_BY_REPO_AND_ID } from './agent-tasks-get-task-by-repo-and-id.token';
import type { AgentTasksGetTaskByRepoAndIdResponse } from './agent-tasks-get-task-by-repo-and-id.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agent-tasks/get-task-by-repo-and-id',
  path: '/agents/repos/{owner}/{repo}/tasks/{task_id}',
  method: 'get',
  tag: 'agent-tasks',
};

export function provideAgentTasksGetTaskByRepoAndIdMock(
  initialBehavior?: ProviderInitialBehavior<AgentTasksGetTaskByRepoAndIdResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENT_TASKS_GET_TASK_BY_REPO_AND_ID,
    'AGENT_TASKS_GET_TASK_BY_REPO_AND_ID',
    initialBehavior,
    _meta,
  );
}
