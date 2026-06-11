import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_LIST_FOR_SUITE } from './checks-list-for-suite.token';
import type { ChecksListForSuiteResponse } from './checks-list-for-suite.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/list-for-suite',
  path: '/repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs',
  method: 'get',
  tag: 'checks',
};

export function provideChecksListForSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ChecksListForSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_LIST_FOR_SUITE,
    'CHECKS_LIST_FOR_SUITE',
    initialBehavior,
    _meta,
  );
}
