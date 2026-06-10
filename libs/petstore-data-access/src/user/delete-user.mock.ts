import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DELETE_USER } from './delete-user.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'deleteUser',
  path: '/user/{username}',
  method: 'delete',
  tag: 'user',
};

export function provideDeleteUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DELETE_USER,
    'DELETE_USER',
    initialBehavior,
    _meta,
  );
}
