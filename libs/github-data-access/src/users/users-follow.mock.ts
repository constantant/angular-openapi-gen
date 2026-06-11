import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_FOLLOW } from './users-follow.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/follow',
  path: '/user/following/{username}',
  method: 'put',
  tag: 'users',
};

export function provideUsersFollowMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_FOLLOW,
    'USERS_FOLLOW',
    initialBehavior,
    _meta,
  );
}
