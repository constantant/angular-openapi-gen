import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_REREQUEST_RUN } from './checks-rerequest-run.token';
import type { ChecksRerequestRunResponse } from './checks-rerequest-run.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/rerequest-run',
  path: '/repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest',
  method: 'post',
  tag: 'checks',
};

export function provideChecksRerequestRunMock(
  initialBehavior?: ProviderInitialBehavior<ChecksRerequestRunResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_REREQUEST_RUN,
    'CHECKS_REREQUEST_RUN',
    initialBehavior,
    _meta,
  );
}
