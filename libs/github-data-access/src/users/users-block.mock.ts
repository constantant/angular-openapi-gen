import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_BLOCK } from './users-block.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/block',
  path: '/user/blocks/{username}',
  method: 'put',
  tag: 'users',
};

export function provideUsersBlockMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    USERS_BLOCK,
    'USERS_BLOCK',
    initialBehavior,
    _meta,
    options,
  );
}
