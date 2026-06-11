import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_CHECK_BLOCKED } from './users-check-blocked.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/check-blocked',
  path: '/user/blocks/{username}',
  method: 'get',
  tag: 'users',
};

export function provideUsersCheckBlockedMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_CHECK_BLOCKED,
    'USERS_CHECK_BLOCKED',
    initialBehavior,
    _meta,
  );
}
