import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_UPDATE_DEFAULT_SETUP } from './code-scanning-update-default-setup.token';
import type { CodeScanningUpdateDefaultSetupResponse } from './code-scanning-update-default-setup.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-scanning/update-default-setup',
  path: '/repos/{owner}/{repo}/code-scanning/default-setup',
  method: 'patch',
  tag: 'code-scanning',
};

export function provideCodeScanningUpdateDefaultSetupMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningUpdateDefaultSetupResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_UPDATE_DEFAULT_SETUP,
    'CODE_SCANNING_UPDATE_DEFAULT_SETUP',
    initialBehavior,
    _meta,
  );
}
