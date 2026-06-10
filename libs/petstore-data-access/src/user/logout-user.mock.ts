import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { LOGOUT_USER } from './logout-user.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'logoutUser',
  path: '/user/logout',
  method: 'get',
  tag: 'user',
};

export function provideLogoutUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    LOGOUT_USER,
    'LOGOUT_USER',
    initialBehavior,
    _meta,
  );
}
