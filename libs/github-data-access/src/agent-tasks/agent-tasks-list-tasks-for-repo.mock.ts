import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { AGENT_TASKS_LIST_TASKS_FOR_REPO } from './agent-tasks-list-tasks-for-repo.token';
import type { AgentTasksListTasksForRepoResponse } from './agent-tasks-list-tasks-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'agent-tasks/list-tasks-for-repo',
  path: '/agents/repos/{owner}/{repo}/tasks',
  method: 'get',
  tag: 'agent-tasks',
};

export function provideAgentTasksListTasksForRepoMock(
  initialBehavior?: ProviderInitialBehavior<AgentTasksListTasksForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    AGENT_TASKS_LIST_TASKS_FOR_REPO,
    'AGENT_TASKS_LIST_TASKS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
