import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_COMMIT_STATUSES_FOR_REF } from './repos-list-commit-statuses-for-ref.token';
import type { ReposListCommitStatusesForRefResponse } from './repos-list-commit-statuses-for-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-commit-statuses-for-ref',
  path: '/repos/{owner}/{repo}/commits/{ref}/statuses',
  method: 'get',
  tag: 'repos',
};

export function provideReposListCommitStatusesForRefMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCommitStatusesForRefResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_COMMIT_STATUSES_FOR_REF,
    'REPOS_LIST_COMMIT_STATUSES_FOR_REF',
    initialBehavior,
    _meta,
  );
}
