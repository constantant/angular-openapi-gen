import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_GET_DEFAULT_SETUP } from './code-scanning-get-default-setup.token';
import type { CodeScanningGetDefaultSetupResponse } from './code-scanning-get-default-setup.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/get-default-setup',
  path: '/repos/{owner}/{repo}/code-scanning/default-setup',
  method: 'get',
  tag: 'code-scanning',
};

export function provideCodeScanningGetDefaultSetupMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningGetDefaultSetupResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_GET_DEFAULT_SETUP,
    'CODE_SCANNING_GET_DEFAULT_SETUP',
    initialBehavior,
    _meta,
  );
}
