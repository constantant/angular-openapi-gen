import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_GET } from './checks-get.token';
import type { ChecksGetResponse } from './checks-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/get',
  path: '/repos/{owner}/{repo}/check-runs/{check_run_id}',
  method: 'get',
  tag: 'checks',
};

export function provideChecksGetMock(
  initialBehavior?: ProviderInitialBehavior<ChecksGetResponse>,
): FactoryProvider {
  return provideMockResource(CHECKS_GET, 'CHECKS_GET', initialBehavior, _meta);
}
