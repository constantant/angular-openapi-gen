import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_UNBLOCK } from './users-unblock.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/unblock',
  path: '/user/blocks/{username}',
  method: 'delete',
  tag: 'users',
};

export function provideUsersUnblockMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_UNBLOCK,
    'USERS_UNBLOCK',
    initialBehavior,
    _meta,
  );
}
