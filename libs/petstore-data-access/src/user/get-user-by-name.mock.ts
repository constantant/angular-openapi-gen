import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GET_USER_BY_NAME } from './get-user-by-name.token';
import type { GetUserByNameResponse } from './get-user-by-name.token';

export function provideGetUserByNameMock(
  initialBehavior?: ProviderInitialBehavior<GetUserByNameResponse>,
): FactoryProvider {
  return provideMockResource(
    GET_USER_BY_NAME,
    'GET_USER_BY_NAME',
    initialBehavior,
  );
}
