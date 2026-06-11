import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { RATE_LIMIT_GET } from './rate-limit-get.token';
import type { RateLimitGetResponse } from './rate-limit-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'rate-limit/get',
  path: '/rate_limit',
  method: 'get',
  tag: 'rate-limit',
};

export function provideRateLimitGetMock(
  initialBehavior?: ProviderInitialBehavior<RateLimitGetResponse>,
): FactoryProvider {
  return provideMockResource(
    RATE_LIMIT_GET,
    'RATE_LIMIT_GET',
    initialBehavior,
    _meta,
  );
}
