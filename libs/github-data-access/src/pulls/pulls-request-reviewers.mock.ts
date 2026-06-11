import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_REQUEST_REVIEWERS } from './pulls-request-reviewers.token';
import type { PullsRequestReviewersResponse } from './pulls-request-reviewers.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/request-reviewers',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers',
  method: 'post',
  tag: 'pulls',
};

export function providePullsRequestReviewersMock(
  initialBehavior?: ProviderInitialBehavior<PullsRequestReviewersResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_REQUEST_REVIEWERS,
    'PULLS_REQUEST_REVIEWERS',
    initialBehavior,
    _meta,
  );
}
