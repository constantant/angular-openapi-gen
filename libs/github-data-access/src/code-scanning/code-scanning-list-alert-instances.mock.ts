import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_LIST_ALERT_INSTANCES } from './code-scanning-list-alert-instances.token';
import type { CodeScanningListAlertInstancesResponse } from './code-scanning-list-alert-instances.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/list-alert-instances',
  path: '/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningListAlertInstancesMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningListAlertInstancesResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_LIST_ALERT_INSTANCES,
    'CODE_SCANNING_LIST_ALERT_INSTANCES',
    initialBehavior,
    _meta,
  );
}
