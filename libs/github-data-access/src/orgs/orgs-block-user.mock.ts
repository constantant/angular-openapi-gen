import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_BLOCK_USER } from './orgs-block-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/block-user',
  path: '/orgs/{org}/blocks/{username}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsBlockUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ORGS_BLOCK_USER,
    'ORGS_BLOCK_USER',
    initialBehavior,
    _meta,
    options,
  );
}
