import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_REPO } from './actions-delete-self-hosted-runner-from-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-self-hosted-runner-from-repo',
  path: '/repos/{owner}/{repo}/actions/runners/{runner_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteSelfHostedRunnerFromRepoMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_REPO,
    'ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_REPO',
    initialBehavior,
    _meta,
  );
}
