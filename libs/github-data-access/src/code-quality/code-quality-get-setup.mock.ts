import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_QUALITY_GET_SETUP } from './code-quality-get-setup.token';
import type { CodeQualityGetSetupResponse } from './code-quality-get-setup.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-quality/get-setup',
  path: '/repos/{owner}/{repo}/code-quality/setup',
  method: 'get',
  tag: 'code-quality',
};

export function provideCodeQualityGetSetupMock(
  initialBehavior?: ProviderInitialBehavior<CodeQualityGetSetupResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_QUALITY_GET_SETUP,
    'CODE_QUALITY_GET_SETUP',
    initialBehavior,
    _meta,
  );
}
