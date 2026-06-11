import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REVIEW_PAT_GRANT_REQUESTS_IN_BULK } from './orgs-review-pat-grant-requests-in-bulk.token';
import type { OrgsReviewPatGrantRequestsInBulkResponse } from './orgs-review-pat-grant-requests-in-bulk.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/review-pat-grant-requests-in-bulk',
  path: '/orgs/{org}/personal-access-token-requests',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsReviewPatGrantRequestsInBulkMock(
  initialBehavior?: ProviderInitialBehavior<OrgsReviewPatGrantRequestsInBulkResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVIEW_PAT_GRANT_REQUESTS_IN_BULK,
    'ORGS_REVIEW_PAT_GRANT_REQUESTS_IN_BULK',
    initialBehavior,
    _meta,
  );
}
