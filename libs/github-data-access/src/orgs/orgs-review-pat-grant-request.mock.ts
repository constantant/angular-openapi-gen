import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REVIEW_PAT_GRANT_REQUEST } from './orgs-review-pat-grant-request.token';

export function provideOrgsReviewPatGrantRequestMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REVIEW_PAT_GRANT_REQUEST,
    'ORGS_REVIEW_PAT_GRANT_REQUEST',
    initialBehavior,
  );
}
