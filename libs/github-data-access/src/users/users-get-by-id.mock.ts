import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_GET_BY_ID } from './users-get-by-id.token';
import type { UsersGetByIdResponse } from './users-get-by-id.token';

export function provideUsersGetByIdMock(
  initialBehavior?: ProviderInitialBehavior<UsersGetByIdResponse>,
): FactoryProvider {
  return provideMockResource(
    USERS_GET_BY_ID,
    'USERS_GET_BY_ID',
    initialBehavior,
  );
}
