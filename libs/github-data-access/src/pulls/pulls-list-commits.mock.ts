import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_COMMITS } from './pulls-list-commits.token';
import type { PullsListCommitsResponse } from './pulls-list-commits.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/list-commits',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/commits',
  method: 'get',
  tag: 'pulls',
};

export function providePullsListCommitsMock(
  initialBehavior?: ProviderInitialBehavior<PullsListCommitsResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_COMMITS,
    'PULLS_LIST_COMMITS',
    initialBehavior,
    _meta,
  );
}
