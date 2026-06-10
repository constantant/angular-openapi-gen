import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GET_USER_BY_NAME } from './get-user-by-name.token';
import type { GetUserByNameResponse } from './get-user-by-name.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'getUserByName',
  path: '/user/{username}',
  method: 'get',
  tag: 'user',
};

export function provideGetUserByNameMock(
  initialBehavior?: ProviderInitialBehavior<GetUserByNameResponse>,
): FactoryProvider {
  return provideMockResource(
    GET_USER_BY_NAME,
    'GET_USER_BY_NAME',
    initialBehavior,
    _meta,
  );
}
