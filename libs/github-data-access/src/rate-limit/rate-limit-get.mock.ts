import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { RATE_LIMIT_GET } from './rate-limit-get.token';
import type { RateLimitGetResponse } from './rate-limit-get.token';

export function provideRateLimitGetMock(
  initialBehavior?: ProviderInitialBehavior<RateLimitGetResponse>,
): FactoryProvider {
  return provideMockResource(RATE_LIMIT_GET, 'RATE_LIMIT_GET', initialBehavior);
}
