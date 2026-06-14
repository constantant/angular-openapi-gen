import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_TRANSFER } from './repos-transfer.token';
import type { ReposTransferResponse } from './repos-transfer.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/transfer',
  path: '/repos/{owner}/{repo}/transfer',
  method: 'post',
  tag: 'repos',
};

export function provideReposTransferMock(
  initialBehavior?: ProviderInitialBehavior<ReposTransferResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_TRANSFER,
    'REPOS_TRANSFER',
    initialBehavior,
    _meta,
    options,
  );
}
