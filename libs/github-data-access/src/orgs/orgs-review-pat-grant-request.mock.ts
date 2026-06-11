import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REVIEW_PAT_GRANT_REQUEST } from './orgs-review-pat-grant-request.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/review-pat-grant-request',
  path: '/orgs/{org}/personal-access-token-requests/{pat_request_id}',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsReviewPatGrantRequestMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVIEW_PAT_GRANT_REQUEST,
    'ORGS_REVIEW_PAT_GRANT_REQUEST',
    initialBehavior,
    _meta,
  );
}
