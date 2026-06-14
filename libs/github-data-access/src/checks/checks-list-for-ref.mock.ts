import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_LIST_FOR_REF } from './checks-list-for-ref.token';
import type { ChecksListForRefResponse } from './checks-list-for-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/list-for-ref',
  path: '/repos/{owner}/{repo}/commits/{ref}/check-runs',
  method: 'get',
  tag: 'checks',
};

export function provideChecksListForRefMock(
  initialBehavior?: ProviderInitialBehavior<ChecksListForRefResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    CHECKS_LIST_FOR_REF,
    'CHECKS_LIST_FOR_REF',
    initialBehavior,
    _meta,
    options,
  );
}
