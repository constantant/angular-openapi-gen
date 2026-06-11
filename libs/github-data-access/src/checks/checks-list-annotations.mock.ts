import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_LIST_ANNOTATIONS } from './checks-list-annotations.token';
import type { ChecksListAnnotationsResponse } from './checks-list-annotations.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/list-annotations',
  path: '/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations',
  method: 'get',
  tag: 'checks',
};

export function provideChecksListAnnotationsMock(
  initialBehavior?: ProviderInitialBehavior<ChecksListAnnotationsResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_LIST_ANNOTATIONS,
    'CHECKS_LIST_ANNOTATIONS',
    initialBehavior,
    _meta,
  );
}
