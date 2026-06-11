import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_REMOVE_REQUESTED_REVIEWERS } from './pulls-remove-requested-reviewers.token';
import type { PullsRemoveRequestedReviewersResponse } from './pulls-remove-requested-reviewers.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/remove-requested-reviewers',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers',
  method: 'delete',
  tag: 'pulls',
};

export function providePullsRemoveRequestedReviewersMock(
  initialBehavior?: ProviderInitialBehavior<PullsRemoveRequestedReviewersResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_REMOVE_REQUESTED_REVIEWERS,
    'PULLS_REMOVE_REQUESTED_REVIEWERS',
    initialBehavior,
    _meta,
  );
}
