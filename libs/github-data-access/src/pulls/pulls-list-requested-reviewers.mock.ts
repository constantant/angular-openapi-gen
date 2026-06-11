import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_REQUESTED_REVIEWERS } from './pulls-list-requested-reviewers.token';
import type { PullsListRequestedReviewersResponse } from './pulls-list-requested-reviewers.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/list-requested-reviewers',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers',
  method: 'get',
  tag: 'pulls',
};

export function providePullsListRequestedReviewersMock(
  initialBehavior?: ProviderInitialBehavior<PullsListRequestedReviewersResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_REQUESTED_REVIEWERS,
    'PULLS_LIST_REQUESTED_REVIEWERS',
    initialBehavior,
    _meta,
  );
}
