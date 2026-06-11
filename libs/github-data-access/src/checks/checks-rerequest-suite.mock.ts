import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_REREQUEST_SUITE } from './checks-rerequest-suite.token';
import type { ChecksRerequestSuiteResponse } from './checks-rerequest-suite.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/rerequest-suite',
  path: '/repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest',
  method: 'post',
  tag: 'checks',
};

export function provideChecksRerequestSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ChecksRerequestSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_REREQUEST_SUITE,
    'CHECKS_REREQUEST_SUITE',
    initialBehavior,
    _meta,
  );
}
