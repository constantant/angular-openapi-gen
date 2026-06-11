import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED } from './users-check-person-is-followed-by-authenticated.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/check-person-is-followed-by-authenticated',
  path: '/user/following/{username}',
  method: 'get',
  tag: 'users',
};

export function provideUsersCheckPersonIsFollowedByAuthenticatedMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED,
    'USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED',
    initialBehavior,
    _meta,
  );
}
