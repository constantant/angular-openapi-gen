import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REVIEW_PAT_GRANT_REQUESTS_IN_BULK } from './orgs-review-pat-grant-requests-in-bulk.token';
import type { OrgsReviewPatGrantRequestsInBulkResponse } from './orgs-review-pat-grant-requests-in-bulk.token';

export function provideOrgsReviewPatGrantRequestsInBulkMock(
  initialBehavior?: ProviderInitialBehavior<OrgsReviewPatGrantRequestsInBulkResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVIEW_PAT_GRANT_REQUESTS_IN_BULK,
    'ORGS_REVIEW_PAT_GRANT_REQUESTS_IN_BULK',
    initialBehavior,
  );
}
