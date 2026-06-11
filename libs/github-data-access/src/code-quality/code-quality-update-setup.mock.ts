import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODE_QUALITY_UPDATE_SETUP } from './code-quality-update-setup.token';
import type { CodeQualityUpdateSetupResponse } from './code-quality-update-setup.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'code-quality/update-setup',
  path: '/repos/{owner}/{repo}/code-quality/setup',
  method: 'patch',
  tag: 'code-quality',
};

export function provideCodeQualityUpdateSetupMock(
  initialBehavior?: ProviderInitialBehavior<CodeQualityUpdateSetupResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_QUALITY_UPDATE_SETUP,
    'CODE_QUALITY_UPDATE_SETUP',
    initialBehavior,
    _meta,
  );
}
