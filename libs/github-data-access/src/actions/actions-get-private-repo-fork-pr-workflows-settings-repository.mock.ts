import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY } from './actions-get-private-repo-fork-pr-workflows-settings-repository.token';
import type { ActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryResponse } from './actions-get-private-repo-fork-pr-workflows-settings-repository.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-private-repo-fork-pr-workflows-settings-repository',
  path: '/repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetPrivateRepoForkPrWorkflowsSettingsRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY,
    'ACTIONS_GET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_REPOSITORY',
    initialBehavior,
    _meta,
  );
}
