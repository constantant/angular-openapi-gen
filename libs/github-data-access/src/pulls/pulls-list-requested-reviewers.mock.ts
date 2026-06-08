import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_REQUESTED_REVIEWERS } from './pulls-list-requested-reviewers.token';
import type { PullsListRequestedReviewersResponse } from './pulls-list-requested-reviewers.token';

export function providePullsListRequestedReviewersMock(
  initialBehavior?: ProviderInitialBehavior<PullsListRequestedReviewersResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_REQUESTED_REVIEWERS,
    'PULLS_LIST_REQUESTED_REVIEWERS',
    initialBehavior,
  );
}
