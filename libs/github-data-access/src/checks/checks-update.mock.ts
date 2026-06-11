import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_UPDATE } from './checks-update.token';
import type { ChecksUpdateResponse } from './checks-update.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/update',
  path: '/repos/{owner}/{repo}/check-runs/{check_run_id}',
  method: 'patch',
  tag: 'checks',
};

export function provideChecksUpdateMock(
  initialBehavior?: ProviderInitialBehavior<ChecksUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_UPDATE,
    'CHECKS_UPDATE',
    initialBehavior,
    _meta,
  );
}
