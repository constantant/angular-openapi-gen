import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_CHECK_FOLLOWING_FOR_USER } from './users-check-following-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/check-following-for-user',
  path: '/users/{username}/following/{target_user}',
  method: 'get',
  tag: 'users',
};

export function provideUsersCheckFollowingForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_CHECK_FOLLOWING_FOR_USER,
    'USERS_CHECK_FOLLOWING_FOR_USER',
    initialBehavior,
    _meta,
  );
}
