import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_REQUEST_REVIEWERS } from './pulls-request-reviewers.token';
import type { PullsRequestReviewersResponse } from './pulls-request-reviewers.token';

export function providePullsRequestReviewersMock(
  initialBehavior?: ProviderInitialBehavior<PullsRequestReviewersResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_REQUEST_REVIEWERS,
    'PULLS_REQUEST_REVIEWERS',
    initialBehavior,
  );
}
