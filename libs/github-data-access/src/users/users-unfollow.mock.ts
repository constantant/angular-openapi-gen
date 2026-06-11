import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
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
): FactoryProvider {
  return provideMockResource(
    USERS_UNFOLLOW,
    'USERS_UNFOLLOW',
    initialBehavior,
    _meta,
  );
}
