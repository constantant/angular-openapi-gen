import { FactoryProvider } from '@angular/core';
import { provideMockObservable } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_UNFOLLOW } from './users-unfollow.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/unfollow',
  path: '/user/following/{username}',
  method: 'delete',
  tag: 'users',
};

export function provideUsersUnfollowMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockObservable(
    USERS_UNFOLLOW,
    'USERS_UNFOLLOW',
    initialBehavior,
    _meta,
    options,
  );
}
