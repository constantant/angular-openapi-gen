import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { UPDATE_USER } from './update-user.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'updateUser',
  path: '/user/{username}',
  method: 'put',
  tag: 'user',
};

export function provideUpdateUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    UPDATE_USER,
    'UPDATE_USER',
    initialBehavior,
    _meta,
  );
}
