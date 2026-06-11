import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_LIST_SUITES_FOR_REF } from './checks-list-suites-for-ref.token';
import type { ChecksListSuitesForRefResponse } from './checks-list-suites-for-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/list-suites-for-ref',
  path: '/repos/{owner}/{repo}/commits/{ref}/check-suites',
  method: 'get',
  tag: 'checks',
};

export function provideChecksListSuitesForRefMock(
  initialBehavior?: ProviderInitialBehavior<ChecksListSuitesForRefResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_LIST_SUITES_FOR_REF,
    'CHECKS_LIST_SUITES_FOR_REF',
    initialBehavior,
    _meta,
  );
}
