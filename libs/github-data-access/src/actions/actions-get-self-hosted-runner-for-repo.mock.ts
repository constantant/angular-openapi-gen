import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_REPO } from './actions-get-self-hosted-runner-for-repo.token';
import type { ActionsGetSelfHostedRunnerForRepoResponse } from './actions-get-self-hosted-runner-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-self-hosted-runner-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners/{runner_id}',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetSelfHostedRunnerForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetSelfHostedRunnerForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_REPO,
    'ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
