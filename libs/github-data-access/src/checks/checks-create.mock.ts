import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_CREATE } from './checks-create.token';
import type { ChecksCreateResponse } from './checks-create.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/create',
  path: '/repos/{owner}/{repo}/check-runs',
  method: 'post',
  tag: 'checks',
};

export function provideChecksCreateMock(
  initialBehavior?: ProviderInitialBehavior<ChecksCreateResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_CREATE,
    'CHECKS_CREATE',
    initialBehavior,
    _meta,
  );
}
