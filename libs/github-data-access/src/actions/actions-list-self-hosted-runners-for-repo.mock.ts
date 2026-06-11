import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_REPO } from './actions-list-self-hosted-runners-for-repo.token';
import type { ActionsListSelfHostedRunnersForRepoResponse } from './actions-list-self-hosted-runners-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-self-hosted-runners-for-repo',
  path: '/repos/{owner}/{repo}/actions/runners',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListSelfHostedRunnersForRepoMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelfHostedRunnersForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_REPO,
    'ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
