import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_GET_SUITE } from './checks-get-suite.token';
import type { ChecksGetSuiteResponse } from './checks-get-suite.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/get-suite',
  path: '/repos/{owner}/{repo}/check-suites/{check_suite_id}',
  method: 'get',
  tag: 'checks',
};

export function provideChecksGetSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ChecksGetSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_GET_SUITE,
    'CHECKS_GET_SUITE',
    initialBehavior,
    _meta,
  );
}
