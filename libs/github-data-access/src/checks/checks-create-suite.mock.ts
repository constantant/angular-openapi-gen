import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_CREATE_SUITE } from './checks-create-suite.token';
import type { ChecksCreateSuiteResponse } from './checks-create-suite.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/create-suite',
  path: '/repos/{owner}/{repo}/check-suites',
  method: 'post',
  tag: 'checks',
};

export function provideChecksCreateSuiteMock(
  initialBehavior?: ProviderInitialBehavior<ChecksCreateSuiteResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_CREATE_SUITE,
    'CHECKS_CREATE_SUITE',
    initialBehavior,
    _meta,
  );
}
